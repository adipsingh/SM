import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatSelectModule, MatInputModule, MatTableModule, MatAutocompleteModule, MatRadioModule, MatIconModule, MatNativeDateModule, MatProgressBarModule, MatDatepickerModule, MatCardModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatTooltipModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../partials/partials.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleGuard } from '../../../core/auth';
import { InterceptService, TypesUtilsService, LayoutUtilsService, HttpUtilsService } from '../../../core/_base/crud';
// import { MethodService } from '../../../core/method-statement/_services/';
import { MethodService } from '../../../core/method-statement/_services/';
import { MethodStatementListComponent } from './method-statement-list/method-statement-list.component';
import { MethodStatementEditComponent } from './method-statement-edit/method-statement-edit.component';
import { MethodStatementComponent } from './method-statement.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { categorysReducer, CategoryEffects, } from '../../../core/method-statement';
@NgModule({
  declarations: [MethodStatementComponent,MethodStatementListComponent, MethodStatementEditComponent],
  imports: [
    CommonModule,


    // ---------------------
    MatDialogModule,
    HttpClientModule,
    PartialsModule,
    NgxPermissionsModule.forChild(),
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
   



    // --------------------------
    RouterModule.forChild([
      {
        path: '',
        component: MethodStatementListComponent
      },
    ]),

    StoreModule.forFeature('methods', categorysReducer),
		EffectsModule.forFeature([CategoryEffects]),
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
		MethodService,
		//ProductRemarksService,
		//ProductSpecificationsService,
		//ProductsService,
		TypesUtilsService,
		LayoutUtilsService
  ],
  entryComponents:[MethodStatementEditComponent]
})
export class MethodStatementModule { }
