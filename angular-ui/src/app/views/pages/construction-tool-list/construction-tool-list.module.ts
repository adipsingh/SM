
import { ConstructionToolListComponent } from './construction-tool-list.component';
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
import { Categoryervice } from '../../../core/construction-tool-list/_services/category.services';
import {CategoryDialogComponent} from './category-dialog/category-dialog.component'
@NgModule({
  declarations: [ConstructionToolListComponent,CategoryDialogComponent],
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
        component: ConstructionToolListComponent
      },
    ]),
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
		Categoryervice,
		//ProductRemarksService,
		//ProductSpecificationsService,
		//ProductsService,
		TypesUtilsService,
		LayoutUtilsService
  ],
  entryComponents:[CategoryDialogComponent]
})
export class ConstructionToolListModule { }
