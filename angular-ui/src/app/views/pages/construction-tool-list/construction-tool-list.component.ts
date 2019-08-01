// Angular
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
// NGRX
import { Store } from '@ngrx/store';
// Translate Module
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, merge, of, Subscription } from 'rxjs';
// RXJS
import { debounceTime, delay, distinctUntilChanged, skip, take, tap } from 'rxjs/operators';
import { AppState } from '../../../core/reducers';

// Services and Models 
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../core/_base/crud';

import { CustomerEditDialogComponent } from '../certificate-qa/certificateqa/certificateqa-edit/certificateqa-edit.dialog.component';
import { CategorysDataSource, CategoryModel, CategorysPageRequested, OneCategoryDeleted, ManyCategorysDeleted } from '../../../core/construction-tool-list';
import { Categoryervice } from '../../../core/construction-tool-list/_services/category.services';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
	selector: 'kt-construction-tool-list',
	templateUrl: './construction-tool-list.component.html',
	styleUrls: ['construction-tool-list.component.scss'],
})

export class ConstructionToolListComponent implements OnInit, OnDestroy {

	// Table fields
	dataSource;
	displayedColumns = ['id', 'category', 'actions'];
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
	 */
	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private categoryService: Categoryervice,
		private store: Store<AppState>
	) { }


	/**
	 * On init
	 */
	ngOnInit() {
		this.loadCategorysList();
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
	loadCategorysList() {
		this.dataSource = new MatTableDataSource([]);
		this.categoryService
			.getAllCategory()
			.subscribe((res:any) => {
				this.dataSource.data = []; 
				const dataArray = res.result; 
				this.dataSource.data = dataArray;
				this.dataSource.paginator = this.paginator;
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
						this.loadCategorysList();
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
	 * Show add category dialog
	 */
	addCategory() {
		const newCategory = new CategoryModel();
		newCategory.clear(); // Set all defaults fields
		this.editCategory(newCategory);
	}

	/**
	 * Show Edit category dialog and save after success close result
	 * @param category: CategoryModel
	 */
	editCategory(category) {
		let saveMessageTranslateParam = category.id > 0 ? 'Category Update successfully' : 'Category added successfully';
		let _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = category.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { category } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				let saveMessageTranslateParam = res;
				_saveMessage = this.translate.instant(saveMessageTranslateParam);
			}
			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadCategorysList();
		});
	}

}