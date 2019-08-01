// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// UI
import { SubheaderService } from '../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, MessageType, QueryParamsModel, TypesUtilsService } from '../../../../core/_base/crud';
// Services and Models
import {
	ProductModel,
	ProductsDataSource,
	ProductsPageRequested,
	OneProductDeleted,
	ManyProductsDeleted,
	ProductsStatusUpdated,
	selectProductsPageLastQuery
} from '../../../../core/e-commerce';
import {
	PrecautionQAModel,
	// SelectPrecautionQAActionLoading,
	PrecautionQAUpdated, PrecautionQAOnServerCreated, selectLastCreatedPrecautionQAId
} from '../../../../core/precaution';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-question-edit',
	templateUrl: './question-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrecautionEditDialogeComponent implements OnInit, OnDestroy {
	// Table fields
	precaution: PrecautionQAModel;
	QuestionForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	private subscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialog: MatDialog
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 */
	constructor(public dialogRef: MatDialogRef<PrecautionEditDialogeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		//	this.store.pipe(select(selectPrecautionQAActionLoading)).subscribe(res => this.viewLoading = res);
		this.precaution = this.data.customer;
		this.createForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}
	}

	createForm() {
		this.QuestionForm = this.fb.group({
			question: [this.precaution.question, Validators.required]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.precaution.id > 0) {
			return `Edit Question '${this.precaution.question}'`;
		}

		return 'New Question';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.QuestionForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared customer
	 */
	prepareCustomer(): PrecautionQAModel {
		const controls = this.QuestionForm.controls;
		const _que = new PrecautionQAModel();
		_que.id = this.precaution.id;
		_que.question = controls['question'].value;
		return _que;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.QuestionForm.controls;
		/** check form */
		if (this.QuestionForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedCustomer = this.prepareCustomer();
		if (editedCustomer.id > 0) {
			this.updateCustomer(editedCustomer);
		} else {
			this.createCustomer(editedCustomer);
		}
	}

	/**
	 * Update customer
	 *
	 * @param _customer: CustomerModel
	 */
	updateCustomer(_customer: PrecautionQAModel) {
		const updateCustomer: Update<PrecautionQAModel> = {
			id: _customer.id,
			changes: _customer
		};
		this.store.dispatch(new PrecautionQAUpdated({
			partialQuestion: updateCustomer,
			question: _customer
		}));

		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _customer, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _customer, isEdit: true }
	}

	/**
	 * Create customer
	 *
	 * @param _customer: CustomerModel
	 */
	createCustomer(_customer: PrecautionQAModel) {
		this.store.dispatch(new PrecautionQAOnServerCreated({ question: _customer }));
		this.subscriptions = this.store.pipe(
			select(selectLastCreatedPrecautionQAId),
			delay(1000), // Remove this line
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.dialogRef.close({ _customer, isEdit: false });
		});
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}

