
import { RouterModule, Routes } from '@angular/router';
//import { PrecautionQaComponent } from './precaution-qa.component';
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

//import { PrecautionEditComponent } from './precaution-edit/precaution-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeApiService } from '../../../core/_base/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PartialsModule } from '../../partials/partials.module';
import { HttpClientModule } from '@angular/common/http';
//import { PrecautionEditDialogeComponent } from './question-edit/question-edit.component';
//import { PrecautionListComponent } from './precaution-list/precaution-list.component';
import { PrecautionQAService } from '../../../core/precaution';
//import { PrecautionEditDialogComponent } from './precaution-edit-dialog/precaution-edit-dialog.component';
import { Preapplication1QaComponent } from './preapplication1-qa.component';

const routes: Routes = [
	{
		path: '',
		component: Preapplication1QaComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'ecommerce' },
			}
];
@NgModule({
  declarations: [Preapplication1QaComponent],
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
	providers: [PrecautionQAService, ],
	entryComponents: [
		
	]
})
export class Preapplication1QAModule { }
