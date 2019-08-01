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
import { AppState } from '../../../../core/reducers';

// Services and Models 
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../core/_base/crud';

import { CategorysDataSource, CategoryModel, CategorysPageRequested, OneCategoryDeleted, ManyCategorysDeleted } from '../../../../core/method-statement';
import { MethodService } from '../../../../core/method-statement';

import { MethodStatementEditComponent } from '../method-statement-edit/method-statement-edit.component';

@Component({
  selector: 'kt-method-statement-list',
     templateUrl: './method-statement-list.component.html',
     styleUrls: ['./method-statement-list.component.scss']
})

export class MethodStatementListComponent implements OnInit, OnDestroy {

	// Table fields
	dataSource;
	displayedColumns = ['id', 'name' ,'description' , 'revision' , 'actions'];
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
		private methodService: MethodService,
		private store: Store<AppState>
	) { }


	/**
	 * On init
	 */
	ngOnInit() {
		this.loadMethodList();
		this.getAllNames();
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
	loadMethodList() {
		debugger;
		
		console.log("loadMethod");

		this.dataSource = new MatTableDataSource([]);
		this.methodService
			.getAllMethod()
			.subscribe((res) => {
				debugger;
				this.dataSource.data = [];
				const dataArray = res["result"];
				this.dataSource.data = dataArray;
				// let mm= dataArray.filter(item => item["result"].media);
			});
	}


	getAllNames(){
		this.methodService
		.getAllFwbsName()
		.subscribe(res =>{
			console.log(res);
		});
	}

	/**
	 * Delete category
	 *
	 * @param _item: CategoryModel
	 */
	deleteMethod(_item: CategoryModel) {
		const _title: string = 'Content Delete'
		const _description: string = 'Are you sure to permanently delete this content?';
		const _waitDesciption: string = 'Content is deleting...';
		const _deleteMessage = 'Content has been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.methodService
				.deleteMethod(_item.id)
				.subscribe((res) => {

					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);

					setTimeout(() => {
						this.loadMethodList();
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
	addMethod() {
		const newCategory = new CategoryModel();
		newCategory.clear(); // Set all defaults fields
		this.editMethod(newCategory);
	}

	/**
	 * Show Edit category dialog and save after success close result
	 * @param category: CategoryModel
	 */
	editMethod(category) {
		let saveMessageTranslateParam = category.id > 0 ? 'Content Update successfully' : 'Content added successfully';
		let _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = category.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(MethodStatementEditComponent, { data: { category } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				let saveMessageTranslateParam = res;
				_saveMessage = this.translate.instant(saveMessageTranslateParam);
			}
			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadMethodList();
		});
	}

}