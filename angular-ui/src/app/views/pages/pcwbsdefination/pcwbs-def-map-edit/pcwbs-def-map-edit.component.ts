// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'kt-pcwbs-def-map-edit',
//   templateUrl: './pcwbs-def-map-edit.component.html',
//   styleUrls: ['./pcwbs-def-map-edit.component.scss']
// })
// export class PcwbsDefMapEditComponent implements OnInit {

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
import { CategoryModel } from '../../../../core/construction-tool-list/_models/category.model';
import { Categoryervice } from '../../../../core/construction-tool-list/_services/category.services';

@Component({
  selector: 'kt-pcwbs-def-map-edit',
  templateUrl: './pcwbs-def-map-edit.component.html',
  styleUrls: ['./pcwbs-def-map-edit.component.scss']
})
export class PcwbsDefMapEditComponent implements OnInit, OnDestroy {

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
  constructor(public dialogRef: MatDialogRef<PcwbsDefMapEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoryService: Categoryervice,
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
    });
  }

	/**
	 * Returns page title
	 */
  getTitle(): string {
    if (this.category.id > 0) {
      return `Edit Category`;
    }

    return 'New Category';
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
  prepareCategory() {
    const controls = this.categoryForm.controls;
    const _category = new CategoryModel();
    _category.id = this.category.id;
    _category.categoryName = controls['Catagory'].value;
    return _category;
  }

	/**
	 * On Submit
	 */
  onSubmit() {
    this.hasFormErrors = false;
    const editedCategory = this.prepareCategory();
    if (editedCategory.id > 0) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

	/**
	 * Update category
	 * 
	 */
  updateCategory() {
    const controls = this.categoryForm.controls;
    let obj = {
      'Catagory': controls['Catagory'].value,
      'ID': this.category.id
    }
    this.categoryService
      .updateCategory(obj)
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
  createCategory() {


    this.categoryService
      .createCategory(this.categoryForm.value)
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
