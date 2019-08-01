import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { Subscription } from 'rxjs';
import { CategoryModel } from '../../../../core/construction-tool-list/_models/category.model';
import { Categoryervice } from '../../../../core/construction-tool-list/_services/category.services';

@Component({
  selector: 'kt-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit, OnDestroy {

  // Public properties
  category;
  categoryForm: FormGroup;
  hasFormErrors: boolean = false;
  viewLoading: boolean = false;
  // Private properties
  private componentSubscriptions: Subscription;
  catImage;
  allImages: any = false;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<CategoryEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
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
    if (this.category.id > 0) {
      this.getAllImagesFromCatID();
    }
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

  fileName = "";
  changeListener($event): void {
    let me = this;
    let file = $event.target.files[0];
    if (file['type'] == 'image/png') {
      this.fileName = ((new Date()).getTime()).toString() + '.png';
      this.readImage(file);
    } else if (file['type'] == 'image/jpeg') {
      this.fileName = ((new Date()).getTime()).toString() + '.jpeg';
      this.readImage(file);
    } else {
      alert("please select image");
    }
  }

  readImage(file) {
    console.log("this.fileName" + this.fileName);

    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let temp: any = reader.result;
      me.catImage = temp.split(',')[1];
    };
    reader.onerror = function (error) {
      alert("Error : " + JSON.stringify(error));
    };
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

  getAllImagesFromCatID() {
    // console.log("loadQA");

    this.categoryService
      .getImageByCategoryId(this.category.id)
      .subscribe((res: any) => {
        console.log("res", res);

        if (res['result'] && res['result']['media']) {
          this.allImages = res['result']['media'];
        } else {
          this.allImages = [];
        }
      }, (e) => {
        console.log("e" + JSON.stringify(e));
      });
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
      'ID': this.category.id,
    }
    let img = {
      "CatagoryID": this.category.id,
      "ImageName": this.fileName,
      "Body": this.catImage
    }

    this.categoryService
      .updateCategoryImage(img)
      .subscribe((res) => {
        console.log("res", res);

        if (this.category.catagory != controls['Catagory'].value) {

          this.categoryService
            .updateCategory(obj)
            .subscribe((res) => {
              console.log("res", res);
              this.dialogRef.close({ res, isEdit: true });
            }
            );

        } else {
          this.dialogRef.close({ res, isEdit: true });
        }
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
