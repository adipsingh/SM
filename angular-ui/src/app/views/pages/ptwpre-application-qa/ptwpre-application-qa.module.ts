import { RouterModule } from '@angular/router';

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
	MatTooltipModule
} from '@angular/material';

import { InterceptService, HttpUtilsService, TypesUtilsService, LayoutUtilsService } from '../../../core/_base/crud';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionNotificationComponent } from '../../partials/content/crud';
//import { AddPTWTypeDialogComponent } from './add-ptwtype/add-ptwtype.dialog.component';
//import { AddQuestionDialogComponent } from './add-question/add-question.dialog.component';
import { PTWPreApplicationQAComponent } from './ptwpre-application-qa.component';
import { PartialsModule } from '../../partials/partials.module';
import { QuestionsAnswerService } from "../../../core/questions-answer/_services/questions-answer.services";
import { QuestionsAnswerDialogComponent } from './questions-answer-dialog/questions-answer-dialog.component';
import { CertificateDialogComponent } from './certificate-dialog/certificate-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [PTWPreApplicationQAComponent,CertificateDialogComponent,QuestionsAnswerDialogComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatListModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		PartialsModule,
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
		MatCheckboxModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		
		RouterModule.forChild([
			{
				path: '',
				component: PTWPreApplicationQAComponent
			},

		]),
	],
	providers: [
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
		HttpUtilsService,
		TypesUtilsService,
		QuestionsAnswerService,
		LayoutUtilsService,
		QuestionsAnswerDialogComponent,
		CertificateDialogComponent
	],
	entryComponents: [
		ActionNotificationComponent,
		QuestionsAnswerDialogComponent,
		CertificateDialogComponent

	],
})
export class PTWPreApplicationQAModule { }
