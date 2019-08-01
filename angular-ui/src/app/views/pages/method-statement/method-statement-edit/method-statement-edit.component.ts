// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'kt-method-statement-edit',
//   templateUrl: './method-statement-edit.component.html',
//   styleUrls: ['./method-statement-edit.component.scss']
// })
// export class MethodStatementEditComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { Subscription } from 'rxjs';
import { CategoryModel } from '../../../../core/method-statement';
import { MethodService } from '../../../../core/method-statement';

@Component({
  selector: 'kt-method-statement-edit',
  templateUrl: './method-statement-edit.component.html',
  styleUrls: ['./method-statement-edit.component.scss']
})
export class MethodStatementEditComponent implements OnInit, OnDestroy {

  // Public properties
  category;
  categoryForm: FormGroup;
  hasFormErrors: boolean = false;
  viewLoading: boolean = false;
  // Private properties
  private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<CategoryEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
  constructor(public dialogRef: MatDialogRef<MethodStatementEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private methodService: MethodService,
  ) {
  }

	/**
	 * On init
	 */
  ngOnInit() {
    this.category = this.data.category;
    console.log("category", this.category);

    this.createForm();
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
    this.categoryForm = this.fb.group({
      Catagory: [this.category.catagory, Validators.required],
      Drawing: [this.category.drawing, Validators.required],
      Description: [this.category.description, Validators.required],
      Revision: [this.category.revision, Validators.required]

    });
  }

	/**
	 * Returns page title
	 */
  getTitle(): string {
    if (this.category.id > 0) {
      return `Edit Content`;
    }

    return 'New Content';
  }

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
  isControlInvalid(controlName: string): boolean {
    const control = this.categoryForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  /** ACTIONS */

	/**
	 * Returns prepared category
	 */
  prepareMethod() {
    const controls = this.categoryForm.controls;
    const _category = new CategoryModel();
    _category.id = this.category.id;
    _category.categoryName = controls['Catagory'].value;
    _category.drawing = controls['Drawing'].value;
    _category.description = controls['Description'].value;
    _category.revision = controls['Revision'].value;
    return _category;
  }

	/**
	 * On Submit
	 */
  onSubmit() {
    this.hasFormErrors = false;
    const editedMethod= this.prepareMethod();
    if (editedMethod.id > 0) {
      this.updateMethod();
    } else {
      this.createMethod();
    }
  }

	/**
	 * Update category
	 * 
	 */
  updateMethod() {
    debugger;
    const controls = this.categoryForm.controls;
    let object = {
      'Catagory': controls['Catagory'].value,
      'Drawing': controls['Drawing'].value,
      'Description': controls['Description'].value,
      'Revision':controls['Revision'].value,
      'ID': this.category.id
    }
    
    this.methodService
      .updateMethod(object)
      .subscribe((res) => {
        console.log("res", res);

        this.dialogRef.close({ res, isEdit: true });
      }
      );


  }

	/**
	 * Create category
	 * 
	 */
  createMethod() {
    debugger;


    this.methodService
      .createMethod(this.categoryForm.value)
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
