// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../core/_base/crud';
// Services and Models
import { CustomerModel, CustomerUpdated, CustomerOnServerCreated, selectLastCreatedCustomerId, selectCustomersPageLoading, selectCustomersActionLoading } from '../../../../core/workinhour';
import { NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-workinghour-edit-dialog',
	templateUrl: './workinghour-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [NgbTimepickerConfig] 
})
export class WorkinghourEditDialogComponent implements OnInit, OnDestroy {
	
	//TimePicker
	ctrl;
	time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
    hourStep = 1;
    minuteStep = 15;
	secondStep = 30;
	

    myGroup = new FormGroup({
		firstName: new FormControl()
	 });


	 status = [
	
		{value: 'yes-1', viewValue: 'Yes'},
		{value: 'no-2', viewValue: 'No'}
	  ];

	
	// Public properties
	customer: CustomerModel;
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
	constructor(public dialogRef: MatDialogRef<WorkinghourEditDialogComponent>,
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


		this.ctrl = new FormControl('', (control: FormControl) => {
			const value = control.value;

			if (!value) {
				return null;
			}

			if (value.hour < 12) {
				return { tooEarly: true };
			}

			if (value.hour > 13) {
				return { tooLate: true };
			}

			return null;
		});
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
			firstName: [this.customer.firstName, Validators.required],
			lastName: [this.customer.lastName, Validators.required],
			email: [ this.customer.email, Validators.compose([Validators.required, Validators.email]) ],
			dob: [this.typesUtilsService.getDateFromString(this.customer.dateOfBbirth), Validators.compose([Validators.nullValidator])],
			userName: [this.customer.userName, Validators.compose([Validators.required])],
			gender: [this.customer.gender, Validators.compose([Validators.required])],
			ipAddress: [this.customer.ipAddress, Validators.compose([Validators.required])],
			type: [this.customer.type.toString(), Validators.compose([Validators.required])]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.customer.id > 0) {
			return `Edit Working Hour '${this.customer.firstName} ${
				this.customer.lastName
			}'`;
		}

		return 'New Working Hour';
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
	prepareCustomer(): CustomerModel {
		const controls = this.customerForm.controls;
		const _customer = new CustomerModel();
		_customer.id = this.customer.id;
		const _date = controls['dob'].value;
		if (_date) {
			_customer.dateOfBbirth = this.typesUtilsService.dateFormat(_date);
		} else {
			_customer.dateOfBbirth = '';
		}
		_customer.firstName = controls['firstName'].value;
		_customer.lastName = controls['lastName'].value;
		_customer.email = controls['email'].value;
		_customer.userName = controls['userName'].value;
		_customer.gender = controls['gender'].value;
		_customer.ipAddress = controls['ipAddress'].value;
		_customer.type = +controls['type'].value;
		_customer.status = this.customer.status;
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
	updateCustomer(_customer: CustomerModel) {
		const updateCustomer: Update<CustomerModel> = {
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
	createCustomer(_customer: CustomerModel) {
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
