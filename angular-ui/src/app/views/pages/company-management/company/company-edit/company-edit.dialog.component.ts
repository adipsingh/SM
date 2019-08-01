// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../core/_base/crud';
// Services and Models
import { CertificateQAModel, CustomerUpdated, CustomerOnServerCreated, selectLastCreatedCustomerId, selectCustomersPageLoading, selectCustomersActionLoading } from '../../../../../core/e-commerce';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-company-edit-dialog',
	templateUrl: './company-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class CustomerEditDialogComponent implements OnInit, OnDestroy {
	// Public properties
	customer: CertificateQAModel;
	customerForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<CustomerEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.store.pipe(select(selectCustomersActionLoading)).subscribe(res => this.viewLoading = res);
		this.customer = this.data.customer;
		this.createForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	createForm() {
		this.customerForm = this.fb.group({
			firstName: [this.customer.name, Validators.required],
			lastName: [this.customer.catagory, Validators.required],
			email: [ this.customer.code, Validators.required ]			
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.customer.id > 0) {
			return `Edit Company '${this.customer.name}'`;
		}

		return 'New Company';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.customerForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared customer
	 */
	prepareCustomer(): CertificateQAModel {
		const controls = this.customerForm.controls;
		const _customer = new CertificateQAModel();
		_customer.id = this.customer.id;
		// const _date = controls['dob'].value;
		// if (_date) {
		// 	_customer.dateOfBbirth = this.typesUtilsService.dateFormat(_date);
		// } else {
		// 	_customer.dateOfBbirth = '';
		// }
		_customer.name = controls['name'].value;
		_customer.catagory = controls['catagory'].value;
		_customer.code = controls['code'].value;		
		return _customer;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.customerForm.controls;
		/** check form */
		if (this.customerForm.invalid) {
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
	updateCustomer(_customer: CertificateQAModel) {
		const updateCustomer: Update<CertificateQAModel> = {
			id: _customer.id,
			changes: _customer
		};
		this.store.dispatch(new CustomerUpdated({
			partialCustomer: updateCustomer,
			customer: _customer
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
	createCustomer(_customer: CertificateQAModel) {
		this.store.dispatch(new CustomerOnServerCreated({ customer: _customer }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedCustomerId),
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
