// Angular
import { ChangeDetectorRef } from '@angular/core';
// Angular
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
// Services and Models
import { QUESTIONS_DICTIONARY } from'../../../../core/precaution';


@Component({
	selector: 'kt-precaution-edit-dialog',
	templateUrl: './precaution-edit-dialog.component.html',
	styleUrls: ['./precaution-edit-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrecautionEditDialogComponent implements OnInit {
	// Public properties
	QuestionEditForm: FormGroup;
	viewLoading: boolean = true;
	loadingAfterSubmit: boolean = false;
	QuestionsDictionary: string[] = QUESTIONS_DICTIONARY;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<SpecificationEditDialogComponent>
	 * @param data: any
	 */
	constructor(
		public dialogRef: MatDialogRef<PrecautionEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initQuestionForm();
		/* Server loading imitation. Remove this on real code */
		of(undefined).pipe(delay(1000)).subscribe(() => { // Remove this line
			this.viewLoading = false; // Remove this line
			this.cdr.detectChanges(); // Remove this line
		}); // Remove this line
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initQuestionForm() {
		// const specName: string = !this.data.id ? '' : this.QuestionsDictionary[this.data.id];
		const question: string = this.data.question;
		const id:number =this.data.id;
		this.QuestionEditForm = this.fb.group({
			id:id,
			question: [question, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])]
		});
	}

	/**
	 * Close dialog
	 */
	onNoClick(): void {
		this.dialogRef.close({ isUpdated: false });
	}

	/**
	 * Save Question
	 */
	save() {
		const controls = this.QuestionEditForm.controls;
		/** check form */
		if (this.QuestionEditForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loadingAfterSubmit = true;
		this.viewLoading = true;

		const id = this.getQuestionIndexByName(controls['question'].value);
		const questionid = controls['id'].value;
		const questionValue = controls['question'].value;
		/* Server loading imitation. Remove this on real code */
		of(undefined).pipe(delay(1000)).subscribe(() => { // Remove this line
			this.viewLoading = false;
			this.closeDialog(questionid, questionValue);
		}); // Remove this line
	}

	/**
	 * Close dialog
	 *
	 * @param specId: any
	 */
	closeDialog(id, questionValue) {
		this.dialogRef.close({
			isUpdated: true,
			question: questionValue,
			id: id
		});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.QuestionEditForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	private getQuestionIndexByName(name: string): number {
		return this.QuestionsDictionary.findIndex(el => el === name);
	}
}
