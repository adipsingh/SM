// Angular
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
// import { MatDialogRef , MatDialogModule  } from  '@angular/material/dialog';
// NGRX
import { Store } from '@ngrx/store';
// Translate Module
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, merge, of, Subscription } from 'rxjs';
// RXJS
import { debounceTime, delay, distinctUntilChanged, skip, take, tap } from 'rxjs/operators';
import { AppState } from '../../../../core/reducers';

// Services and Models 
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../core/_base/crud';

import { CustomerEditDialogComponent } from '../../certificate-qa/certificateqa/certificateqa-edit/certificateqa-edit.dialog.component';
import { CategorysDataSource, CategoryModel, CategorysPageRequested, OneCategoryDeleted, ManyCategorysDeleted } from '../../../../core/pcwbs-def-area';
import { Categoryervice } from '../../../../core/pcwbs-def-area/_services/';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PcwbsDefMapEditComponent } from '../pcwbs-def-map-edit/pcwbs-def-map-edit.component';


@Component({
    selector: 'kt-pcwbs-def-map',
    templateUrl: './pcwbs-def-map.component.html',
    styleUrls: ['./pcwbs-def-map.component.scss']
})

export class PcwbsDefMapComponent implements OnInit, OnDestroy {

area
  viewLoading: boolean = false;
  categoryForm: FormGroup;
  hasFormErrors: boolean = false;

	// Table fields
	dataSource;
	displayedColumns = ['id', 'area', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<CategoryModel>(true, []);
	categorysResult: CategoryModel[] = [];
	// Subscriptions
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param dialog: MatDialog
	 * @param snackBar: MatSnackBar
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
   *  @param dialogRef: MatDialogRef<PcwbsDefMapComponent>
	 */

	constructor(
    public dialog: MatDialog,
     public dialogRef: MatDialogRef<PcwbsDefMapComponent>,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private categoryService: Categoryervice,
    private store: Store<AppState>,
	@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
	) { }


	/**
	 * On init
	 */
	ngOnInit() {

     this.area = this.data.area;
      console.log("area", this.area);

    // this.createForm();
		this.loadAreaList();
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	/**
	 * Load Categorys List from service through data-source
	 */
	loadAreaList() {
		console.log("loadCategory");

		this.dataSource = new MatTableDataSource([]);
		this.categoryService
			.getAllArea()
			.subscribe((res) => {
				this.dataSource.data = [];
				const dataArray = res;
				this.dataSource.data = dataArray;
			});
	}

	/**
	 * Delete category
	 *
	 * @param _item: CategoryModel
	 */
	deleteCategory(_item: CategoryModel) {
		const _title: string = 'Category Delete'
		const _description: string = 'Are you sure to permanently delete this category?';
		const _waitDesciption: string = 'Category is deleting...';
		const _deleteMessage = 'Category has been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.categoryService
				.deleteCategory(_item.id)
				.subscribe((res) => {

					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);

					setTimeout(() => {
						this.loadAreaList();
					}, 2000);

					let index;
					this.dataSource.data.findIndex((emt, i) => {
						if (emt.id == _item.id) {
							index = i;
						}
					});

					this.dataSource.data.splice(index, 1);
					const dataArray = this.dataSource.data
					this.dataSource.data = dataArray;
				}
				);
		});
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

  
  createForm() {
    this.categoryForm = this.fb.group({
		Area: [this.area.area, Validators.required],
    });
  }

// createForm() {
// 	this.categoryForm = this.fb.group({
// 		area: [this.area.area, Validators.required],
		
// 	});
// }

//   updateCategory() {
//     const controls = this.categoryForm.controls;
//     let obj = {
//       'Catagory': controls['Catagory'].value,
//       'ID': this.category.id
//     }
//     this.categoryService
//       .updateCategory(obj)
//       .subscribe((res) => {
//         console.log("res", res);

//     //    this.dialogRef.close({ res, isEdit: true });
//       }
//       );


//   }

updateCategory() {
    const controls = this.categoryForm.controls;
    let obj = {
      'Area': controls['Area'].value,
      'ID': this.area.id
    }
    this.categoryService
      .updateCategory(obj)
      .subscribe((res) => {
        console.log("res", res);

      //  this.dialogRef.close({ res, isEdit: true });
      }
      );


  }


  prepareCategory() {
    const controls = this.categoryForm.controls;
    const _area = new CategoryModel();
    _area.id = this.area.id;
    _area.area = controls['Area'].value;
    return _area;
  }

  myGroup = new FormGroup({
    area: new FormControl()
 });

  /**
	 * Create category
	 * 
	 */
  createCategory() {


    this.categoryService
      .createCategory(this.categoryForm.value)
      .subscribe((res) => {
      //  this.dialogRef.close({ res, isEdit: false });
      console.log(res);
      }
      );

  }

  onSubmit() {
    this.hasFormErrors = false;
    const editedCategory = this.prepareCategory();
     if (editedCategory.id > 0) {
      this.updateCategory();
     }
     else {
      this.createCategory();
    }
  }

	/**
	 * Show add category dialog
	 */
	addCategory() {
		const newArea= new CategoryModel();
		newArea.clear(); // Set all defaults fields
		this.editCategory(newArea);
	}

	/**
	 * Show Edit category dialog and save after success close result
	 * @param category: CategoryModel
	 */
	editCategory(area) {
		let saveMessageTranslateParam = area.id > 0 ? 'Category Update successfully' : 'Category added successfully';
		let _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = area.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(PcwbsDefMapEditComponent, { data: { area } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				let saveMessageTranslateParam = res;
				_saveMessage = this.translate.instant(saveMessageTranslateParam);
			}
			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadAreaList();
		});
	}

}