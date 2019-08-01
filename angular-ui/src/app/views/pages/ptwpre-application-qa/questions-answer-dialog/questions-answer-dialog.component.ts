import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionsAnswerService } from '../../../../core/questions-answer/_services/questions-answer.services';
import { QuestionsAnswerModel } from '../../../../core/questions-answer/_models/questions-answer.model';

@Component({
  selector: 'kt-questions-answer-dialog',
  templateUrl: './questions-answer-dialog.component.html',
  styleUrls: ['./questions-answer-dialog.component.scss']
})
export class QuestionsAnswerDialogComponent implements OnInit {


  // Public properties
  qa: any;
  qaForm: FormGroup;
  hasFormErrors: boolean = false;
  viewLoading: boolean = false;
  // Private properties
  private componentSubscriptions: Subscription;
  catImage;
  certificateArray: [];
  certificates = new FormControl();
	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<QAEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
  constructor(public dialogRef: MatDialogRef<QuestionsAnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private qaService: QuestionsAnswerService,
  ) {
    this.loadCertificate();
  }

	/**
	 * On init
	 */
  ngOnInit() {
    this.qa = this.data.qa;
    this.createForm();
  }


  chkCertificate() {
    if (this.certificateArray != []) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Load Certificate List from service through data-source
   */
  loadCertificate() {
    this.qaService
      .getAllCertificate()
      .subscribe((res: any) => {
        this.certificateArray = res['result']; 

        if (this.qa && this.qa.id > 0 && (this.qa.certificates).length > 0) {
          let obj = [];  
          this.certificateArray.forEach((cer, j) => {
            this.qa.certificates.forEach((emt: any, i) => {
 
              if (emt['name'] == cer['name']) {
                obj.push(this.certificateArray[j]['name'])
              } 

            });

            if((j + 1) == (this.certificateArray).length){ 
              this.certificates.setValue(obj);
            }

          });

        }
      });
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
    this.qaForm = this.fb.group({
      questionTitle: [this.qa ? this.qa.questionTitle : '', Validators.required]
    });
  }

	/**
	 * Returns page title
	 */
  getTitle(): string {
    if (this.qa && this.qa.id > 0) {
      return `Edit QA`;
    }

    return 'New QA';
  }

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
  isControlInvalid(controlName: string): boolean {
    const control = this.qaForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  /** ACTIONS */

	/**
	 * Returns prepared qa
	 */
  prepareQA() {
    const controls = this.qaForm.controls;
    const _qa = new QuestionsAnswerModel();
    _qa.id = this.qa.id;
    _qa.questionTitle = controls['questionTitle'].value;
    return _qa;
  }

	/**
	 * On Submit
	 */
  onSubmit() {
    this.hasFormErrors = false;
    const editedQA = this.prepareQA();
    if (editedQA.id > 0) {
      this.updateQA();
    } else {
      this.createQA();
    }

  }



	/**
	 * Update qa
	 * 
	 */
  updateQA() {
    let obj = {
      "QuestionTitle": this.qaForm.controls['questionTitle'].value,
      "ID": this.qa.id,
      Certificates: []
    }

    let array = this.certificates.value;
    this.certificateArray.forEach((emt: any) => {
      if (array.includes(emt.name)) {
        obj.Certificates.push(emt);
      }
    });


    this.qaService
      .updateQA(obj)
      .subscribe((res) => {
        console.log("res", res);
        this.dialogRef.close({ res, isEdit: true });
      }
      );

  }

	/**
	 * Create qa
	 * 
	 */
  createQA() {
    let obj = {
      "QuestionTitle": this.qaForm.controls['questionTitle'].value,
      Certificates: []
    }

    let array = this.certificates.value;
    this.certificateArray.forEach((emt: any) => {
      if (array.includes(emt.name)) {
        obj.Certificates.push(emt);
      }
    });

    this.qaService
      .createQA(obj)
      .subscribe((res) => {
        this.dialogRef.close({ res, isEdit: false });
      }
      );

  }

  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

}
