
import { RouterModule, Routes } from '@angular/router';
import { PrecautionQaComponent } from './precaution-qa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatInputModule,
	MatListModule,
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
	MatTooltipModule,
  MAT_CHECKBOX_CLICK_ACTION
} from '@angular/material';

import { PrecautionEditComponent } from './precaution-edit/precaution-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../src/environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeApiService } from '../../../../../src/app/core/_base/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PartialsModule } from '../../partials/partials.module';
import { HttpClientModule } from '@angular/common/http';
import { PrecautionEditDialogeComponent } from './question-edit/question-edit.component';
import { PrecautionListComponent } from './precaution-list/precaution-list.component';
import { PrecautionQAService } from '../../../../../src/app/core/precaution';
import { PrecautionEditDialogComponent } from './precaution-edit-dialog/precaution-edit-dialog.component';

const routes: Routes = [
	{
		path: '',
		component: PrecautionQaComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'ecommerce' },
		children: [
			{
				path: '',
			//	redirectTo: 'edit',
				pathMatch: 'full',
				component: PrecautionQaComponent
			},
			{
				path: 'edit',
				component: PrecautionEditComponent
			},
			{
				path: 'precaution/edit',
				component: PrecautionEditComponent
			},
			// {
			// 	path: 'section',
			// 	component: ProductsListComponent,
			// },
			// {
			// 	path: 'section/add',
			// 	component: ProductEditComponent
			// },
			// {
			// 	path: 'section/edit',
			// 	component: ProductEditComponent
			// },
			// {
			// 	path: 'section/edit/:id',
			// 	component: ProductEditComponent
			// },
		]
	}
];
@NgModule({
  declarations: [PrecautionQaComponent, PrecautionEditDialogeComponent, PrecautionEditComponent, PrecautionListComponent, PrecautionEditDialogComponent],
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
    //MAT_CHECKBOX_CLICK_ACTION,
    // RouterModule.forChild([
    //   {
    //     path:'',
    //     component: PrecautionQaComponent
    //   },
    // ]),
	],
	providers: [PrecautionQAService, PrecautionEditDialogComponent],
	entryComponents: [
		PrecautionEditDialogComponent
	]
})
export class PrecautionQAModule { }
