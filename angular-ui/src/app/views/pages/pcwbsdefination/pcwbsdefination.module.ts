
// import { PCWBSDefinationComponent } from './pcwbsdefination.component';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import {
// 	MatInputModule,
// 	MatListModule,
// 	MatPaginatorModule,
// 	MatProgressSpinnerModule,
// 	MatSortModule,
// 	MatTableModule,
// 	MatSelectModule,
// 	MatMenuModule,
// 	MatProgressBarModule,
// 	MatButtonModule,
// 	MatCheckboxModule,
// 	MatDialogModule,
// 	MatTabsModule,
// 	MatNativeDateModule,
// 	MatCardModule,
// 	MatRadioModule,
// 	MatIconModule,
// 	MatDatepickerModule,
// 	MatAutocompleteModule,
// 	MAT_DIALOG_DEFAULT_OPTIONS,
// 	MatSnackBarModule,
// 	MatTooltipModule,
//   MAT_CHECKBOX_CLICK_ACTION
// } from '@angular/material';
// import { PcwbsDefMapComponent } from './pcwbs-def-map/pcwbs-def-map.component';



// @NgModule({
//   declarations: [PCWBSDefinationComponent, PcwbsDefMapComponent],
//   imports: [
//     CommonModule,
//     MatInputModule,
// 	  MatPaginatorModule,
//   MatProgressSpinnerModule,
// 	MatSortModule,
// 	MatTableModule,
// 	MatListModule,
// 	MatSelectModule,
// 	MatMenuModule,
// 	MatProgressBarModule,
// 	MatButtonModule,
// 	MatCheckboxModule,
// 	MatDialogModule,
// 	MatTabsModule,
// 	MatNativeDateModule,
// 	MatCardModule,
// 	MatRadioModule,
// 	MatIconModule,
// 	MatDatepickerModule,
// 	MatAutocompleteModule,	
// 	MatSnackBarModule,
// 	MatTooltipModule,
//     RouterModule.forChild([
// 			{
// 				path: '',
// 				component: PcwbsDefMapComponent
// 			},
// 		]),
//   ],
//   providers:[
//           {
//         provide: MAT_DIALOG_DEFAULT_OPTIONS,
//         useValue: {
//           hasBackdrop: true,
//           panelClass: 'kt-mat-dialog-container__wrapper',
//           height: 'auto',
//           width: '900px'
//         }
        
//       },
//       {
//         provide:MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'
//       }
       
//   ]
// })
// export class PCWBSDefinationModule { }



import { PCWBSDefinationComponent } from './pcwbsdefination.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatSelectModule, MatInputModule, MatTableModule, MatAutocompleteModule, MatRadioModule, MatIconModule, MatNativeDateModule, MatProgressBarModule, MatDatepickerModule, MatCardModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatTooltipModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../partials/partials.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleGuard } from '../../../core/auth';
import { InterceptService, TypesUtilsService, LayoutUtilsService, HttpUtilsService } from '../../../core/_base/crud';
import { Categoryervice } from '../../../core/pcwbs-def-area/_services/category.services';
import { PcwbsDefMapComponent } from './pcwbs-def-map/pcwbs-def-map.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { categorysReducer, CategoryEffects, } from '../../../core/pcwbs-def-area';
	import { from } from 'rxjs';
import { PcwbsDefMapEditComponent } from './pcwbs-def-map-edit/pcwbs-def-map-edit.component';

// import {CategoryDialogComponent} from './category-dialog/category-dialog.component'
@NgModule({
  declarations: [PCWBSDefinationComponent,PcwbsDefMapComponent, PcwbsDefMapEditComponent],
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
        component: PcwbsDefMapComponent
      },
	]),
	
	StoreModule.forFeature('area', categorysReducer),
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
		Categoryervice,
		//ProductRemarksService,
		//ProductSpecificationsService,
		//ProductsService,
		TypesUtilsService,
    LayoutUtilsService,
    { provide: MatDialogRef, useValue: {} },
{ provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  entryComponents:[PcwbsDefMapEditComponent]
})
export class PCWBSDefinationModule { }
