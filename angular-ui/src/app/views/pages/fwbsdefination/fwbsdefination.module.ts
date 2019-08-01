
import { FWBSDefinationComponent } from "./fwbsdefination.component";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PartialsModule } from '../../partials/partials.module';

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
import { FwbsDefUploadComponent } from './fwbs-def-upload/fwbs-def-upload.component';
import { FWBSDefinationService } from '../../../../../src/app/core/fwbsdefination/_services/FWBSDefination.service';



@NgModule({
  declarations: [FWBSDefinationComponent, FwbsDefUploadComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    PartialsModule,
    MatInputModule,
    MaterialFileInputModule,
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
    MatSnackBarModule,
    MatTooltipModule,
    RouterModule.forChild([
			{
				path: '',
				component: FWBSDefinationComponent
			},
		]),
  ],
  providers:[FWBSDefinationService]
})
export class FWBSDefinationModule { }
