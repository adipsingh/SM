// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA , MatPaginator, MatSort, MatSnackBar, MatDialog} from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay, take, distinctUntilChanged, skip, find } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService, QueryParamsModel } from '../../../../../core/_base/crud';
// Services and Models
import { CustomerModel, CustomerUpdated, CustomerOnServerCreated, selectLastCreatedCustomerId, selectCustomersPageLoading, selectCustomersActionLoading, CustomersService, CustomersDataSource ,CertificatePageRequested} from '../../../../../core/certificateqa';
import { SelectionModel } from '@angular/cdk/collections';
// import { CertificatePageRequested } from '../../../../../../../src/app/core/certificateqa/_actions/customer.actions';


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-certificateqa-edit-dialog',
	templateUrl: './certificateqa-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class CustomerEditDialogComponent implements OnInit, OnDestroy {

	allSelected = false;
	//area :string[]=['MCMS','Parking Area','Camp A','Camp B'];

	dataSource: CustomersDataSource;
	displayedColumns = ['select','id', 'certificatename', 'actions'];

	// Public properties
	customer: CustomerModel;
	customerForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	// Private properties
	private componentSubscriptions: Subscription;
	private subscriptions: Subscription[] = [];
	public certificateResult: CustomerModel[] = [];
	
	selection = new SelectionModel<CustomerModel>(true, []);
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
		private certificate: CustomersService,
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
		//this.loadCertificateList();

		// Init DataSource
		this.dataSource = new CustomersDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.certificateResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadCertificateList();
		}); // Remove this line, just loading imitation
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
		// this.customerForm = this.fb.group({
		// 	firstName: [this.customer.firstName, Validators.required],
		// 	lastName: [this.customer.lastName, Validators.required],
		// 	email: [ this.customer.email, Validators.compose([Validators.required, Validators.email]) ],
		// 	dob: [this.typesUtilsService.getDateFromString(this.customer.dateOfBbirth), Validators.compose([Validators.nullValidator])],
		// 	userName: [this.customer.userName, Validators.compose([Validators.required])],
		// 	gender: [this.customer.gender, Validators.compose([Validators.required])],
		// 	ipAddress: [this.customer.ipAddress, Validators.compose([Validators.required])],
		// 	type: [this.customer.type.toString(), Validators.compose([Validators.required])]
		// });
		this.customerForm = this.fb.group({
			question: [this.customer.question, Validators.required],
			excavation: [this.customer.excavation],
			confinedSpace: [ this.customer.confinedSpace],
			radioGraphy: [this.customer.radioGraphy],
			energization: [this.customer.energization],
			electrical: [this.customer.electrical],
			criticalLift: [this.customer.criticalLift],
			gratingRemoval: [this.customer.gratingRemoval]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.customer.id > 0) {
			return `Edit Certificate Question '`;
		}

		return 'New Question';
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
		// const controls = this.customerForm.controls;
		// const _customer = new CustomerModel();
		// _customer.id = this.customer.id;
		// const _date = controls['dob'].value;
		// if (_date) {
		// 	_customer.dateOfBbirth = this.typesUtilsService.dateFormat(_date);
		// } else {
		// 	_customer.dateOfBbirth = '';
		// }
		// _customer.firstName = controls['firstName'].value;
		// _customer.lastName = controls['lastName'].value;
		// _customer.email = controls['email'].value;
		// _customer.userName = controls['userName'].value;
		// _customer.gender = controls['gender'].value;
		// _customer.ipAddress = controls['ipAddress'].value;
		// _customer.type = +controls['type'].value;
		// _customer.status = this.customer.status;
		// return _customer;
		const controls = this.customerForm.controls;
		const _customer = new CustomerModel();
		_customer.id = this.customer.id;		
		_customer.question = controls['question'].value;
		_customer.excavation = controls['excavation'].value;
		 _customer.confinedSpace = controls['confinedspace'].value;
		 _customer.radioGraphy = controls['radiography'].value;
		 _customer.energization = controls['energization'].value;
		 _customer.electrical = controls['electrical'].value;
		 _customer.criticalLift = controls['criticalLift'].value;
		 _customer.gratingRemoval = controls['gratingRemoval'].value;
		return _customer;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.customerForm.controls;
		/** check form */
		// if (this.customerForm.invalid) {
		// 	Object.keys(controls).forEach(controlName =>
		// 		controls[controlName].markAsTouched()
		// 	);

		// 	this.hasFormErrors = true;
		// 	return;
		// }

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


	/* get all certificate */

	loadCertificateList() {
		debugger;
		// this.selection.clear();
		// const queryParams = new QueryParamsModel(
			
		// );
		this.certificate.getAllCertificate()
		

		.subscribe(response => 
			{ 		
				this.certificateResult = response;
			}, 
			err => console.log(err), ()=> console.log(this.certificateResult)
			);


		// Call request from server
		this.store.dispatch(new CertificatePageRequested());
		this.selection.clear();
	}

	masterToggle() {
		if (this.selection.selected.length === this.certificateResult.length) {
			this.selection.clear();
		} else {
			this.certificateResult.forEach(row => this.selection.select(row));
		}
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.certificateResult.length;
		return numSelected === numRows;
	}

	prepareRole(): CustomerModel {
		const _certificate = new CustomerModel();
		_certificate.id = this.customer.id;
		//_certificate.permissions = this.preparePermissionIds();
		// each(this.assignedRoles, (_role: Role) => _user.roles.push(_role.id));
		_certificate.question = this.customer.question;
		_certificate.certificatename = this.customer.certificatename;
		return _certificate;
	}

	// isSelectedChanged($event) {
	// 	for(let i=0; i<this.certificateResult.length; i++) {
	// 	  this.certificateResult[i].checked = this.allSelected;
	// 	}
	//  }

// 	isSelectedChanged($event, certificate: CustomerModel) {
// 		if (certificate.certificatename.length === 0 && certificate.certificatename) {
// 			const _root = find(this.certificateResult),(item : CustomerModel) => item.id === certificate.checked );
// 			// if (_root && !_root.isSelected) {
// 			// 	_root.isSelected = true;
// 			// }
// 			return;
// 		}
// }

// isSelectedChanged($event, CustomerModel: CustomerModel) {
// 	if (CustomerModel.certificatename.length === 0 && CustomerModel.isSelected) {
// 		const _root = find(this.certificateResult, (item: CustomerModel) => item.id === CustomerModel.parentId);
// 		if (_root && !_root.isSelected) {
// 			_root.isSelected = true;
// 		}
// 		return;
// 	}

// 	if (CustomerModel.certificatename.length === 0 && !CustomerModel.isSelected) {
// 		const _root = find(this.rolePermissions, (item: Permission) => item.id === CustomerModel.parentId);
// 		if (_root && _root.isSelected) {
// 			if (!some(_root._children, (item: Permission) => item.isSelected === true)) {
// 				_root.isSelected = false;
// 			}
// 		}
// 		return;
// 	}

// 	if (permission._children.length > 0 && permission.isSelected) {
// 		each(permission._children, (item: Permission) => item.isSelected = true);
// 		return;
// 	}

// 	if (permission._children.length > 0 && !permission.isSelected) {
// 		each(permission._children, (item: Permission) => {
// 			item.isSelected = false;
// 		});
// 		return;
// 	}
// }

}
