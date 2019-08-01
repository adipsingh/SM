// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Fake API Angular-in-memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Translate Module
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// UI
import { PartialsModule } from '../../partials/partials.module';
// Core
import { FakeApiService } from '../../../core/_base/layout';
// Auth
import { ModuleGuard } from '../../../core/auth';
// Core => Services
import {
	customersReducer,
	CustomerEffects,
	CustomersService,
	productsReducer,
	ProductEffects,
	ProductsService,
	productRemarksReducer,
	ProductRemarkEffects,
	ProductRemarksService,
	productSpecificationsReducer,
	ProductSpecificationEffects,

	ProductSpecificationsService
} from '../../../core/e-commerce';

import {employeeReducer,EmployeeEffects, EmployeeService} from '../../../core/employee';
import {functionReducer,FunctionEffects,FunctionService} from '../../../core/functions';
// Core => Utils
import { HttpUtilsService,
	TypesUtilsService,
	InterceptService,
	LayoutUtilsService
} from '../../../core/_base/crud';
// Shared
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent
} from '../../partials/content/crud';
// Components
import { ECommerceComponent } from './company-management.component';
// Customers
import { CustomersListComponent } from './company/company-list/company-list.component';
import { CustomerEditDialogComponent } from './company/company-edit/company-edit.dialog.component';
// Products
import { ProductsListComponent } from './section/section-list/section-list.component';
import { ProductEditComponent } from './section/section-edit/section-edit.component';
import { RemarksListComponent } from './section/_subs/remarks/remarks-list/remarks-list.component';
import { SpecificationsListComponent } from './section/_subs/specifications/specifications-list/specifications-list.component';
import { SpecificationEditDialogComponent } from './section/_subs/specifications/specification-edit/specification-edit-dialog.component';
// Orders
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
// Material
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
} from '@angular/material';
import { environment } from '../../../../environments/environment';
import { CoreModule } from '../../../core/core.module';
import { NgbProgressbarModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FunctionListComponent } from './function/function-list/function-list.component';
import { FunctionEditComponent } from './function/function-edit/function-edit.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { from } from 'rxjs';

// tslint:disable-next-line:class-name
const routes: Routes = [
	{
		path: '',
		component: ECommerceComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'ecommerce' },
		children: [
			{
				path: '',
				redirectTo: 'company',
				pathMatch: 'full'
			},
			{
				path: 'company',
				component: CustomersListComponent
			},
			{
				path: 'orders',
				component: OrdersListComponent
			},
			{
				path: 'section',
				component: ProductsListComponent,
			},
			{
				path: 'section/add',
				component: ProductEditComponent
			},
			{
				path: 'section/edit',
				component: ProductEditComponent
			},
			{
				path: 'section/edit/:id',
				component: ProductEditComponent
			},

			 //function 
			 {
				path: 'function',
				component: FunctionListComponent
			  },
			  {
						path: 'function:id',
						component: FunctionListComponent
					},
					{
						path: 'function/add',
						component: FunctionEditComponent
					},
					{
						path: 'function/add:id',
						component: FunctionEditComponent
					},
					{
						path: 'function/edit',
						component: FunctionEditComponent
					},
					{
						path: 'function/edit/:id',
						component: FunctionEditComponent
			  },
		
			  //employee 
			  {
				path: 'employee',
				component: EmployeeListComponent
			  },
		
			  {
						path: 'employee:id',
						component: EmployeeListComponent
					},
					{
						path: 'employee/add',
						component: EmployeeEditComponent
					},
					{
						path: 'employee/add:id',
						component: EmployeeEditComponent
					},
					{
						path: 'employee/edit',
						component: EmployeeEditComponent
					},
					{
						path: 'employee/edit/:id',
						component: EmployeeEditComponent
			  },
		]
	}
];

@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		HttpClientModule,
		PartialsModule,
		NgxPermissionsModule.forChild(),
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,
		environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forFeature(FakeApiService, {
			passThruUnknownUrl: true,
        	dataEncapsulation: false
		}) : [],
		StoreModule.forFeature('section', productsReducer),
		EffectsModule.forFeature([ProductEffects]),
		StoreModule.forFeature('company', customersReducer),
		EffectsModule.forFeature([CustomerEffects]),
		StoreModule.forFeature('productRemarks', productRemarksReducer),
		EffectsModule.forFeature([ProductRemarkEffects]),
		StoreModule.forFeature('productSpecifications', productSpecificationsReducer),
		EffectsModule.forFeature([ProductSpecificationEffects]),
		
		StoreModule.forFeature('employes', employeeReducer),
		EffectsModule.forFeature([EmployeeEffects]),

		StoreModule.forFeature('function', functionReducer),
		EffectsModule.forFeature([FunctionEffects]),
	],
	providers: [
		ModuleGuard,
		InterceptService,
      	{
        	provide: HTTP_INTERCEPTORS,
       	 	useClass: InterceptService,
        	multi: true
      	},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		TypesUtilsService,
		LayoutUtilsService,
		HttpUtilsService,
		CustomersService,
		ProductRemarksService,
		ProductSpecificationsService,
		ProductsService,
		TypesUtilsService,
		LayoutUtilsService,
		EmployeeService,
		FunctionService
	],
	entryComponents: [
		ActionNotificationComponent,
		CustomerEditDialogComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		SpecificationEditDialogComponent
	],
	declarations: [
		ECommerceComponent,
		// Customers
		CustomersListComponent,
		CustomerEditDialogComponent,
		// Orders
		OrdersListComponent,
		OrderEditComponent,
		// Products
		ProductsListComponent,
		ProductEditComponent,
		RemarksListComponent,
		SpecificationsListComponent,
		SpecificationEditDialogComponent,
		FunctionListComponent,
		FunctionEditComponent,
		EmployeeListComponent,
		EmployeeEditComponent
	]
})
export class CompanyManagementModule { }
