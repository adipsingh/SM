// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
// LODASH
import _ from 'lodash';
// Services
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud';
// Models
import { Role, RolesDataSource, RoleDeleted, RolesPageRequested } from '../../../../core/auth';
//import { QueryParamsModel, LayoutUtilsService } from 'src/app/core/_base/crud';

import { AppState } from '../../../../../../src/app/core/reducers';
import { QueryParamsModel } from '../../../../../../src/app/core/_base/crud';
import { PrecautionQAService } from '../../../../../../src/app/core/precaution/_services/precaution.service';
import { PrecautionQAPageRequested, PrecautionQADataSource, PrecautionQAModel } from '../../../../../../src/app/core/precaution';
//import { AppState } from '../../../../../core/reducers';
//import { QueryParamsModel } from '../../../../../core/_base/crud';

// Components
import example from '../../../../../assets/sample.json';
import { PrecautionEditDialogComponent } from '../precaution-edit-dialog/precaution-edit-dialog.component';
@Component({
	selector: 'kt-precaution-list',
	templateUrl: './precaution-list.component.html',
	styleUrls: ['./precaution-list.component.scss']
})
export class PrecautionListComponent implements OnInit, OnDestroy {
	// Table fields
	//dataSource: RolesDataSource;
	dataSource;//: PrecautionQADataSource;
	displayedColumns = ['select', 'id', 'question', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	// Selection
	selection = new SelectionModel<PrecautionQAModel>(true, []);
	rolesResult: PrecautionQAModel[] = [];

	// Subscriptions
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param dialog: MatDialog
	 * @param snackBar: MatSnackBar
	 * @param layoutUtilsService: LayoutUtilsService
	 */
	constructor(
		private store: Store<AppState>,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private precautionService: PrecautionQAService,
		private layoutUtilsService: LayoutUtilsService
	) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => {
				this.loadQuestionList();
			})
		)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		// Filtration, bind to searchInput
		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			// tslint:disable-next-line:max-line-length
			debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
			distinctUntilChanged(), // This operator will eliminate duplicate values
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadQuestionList();
			})
		)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		// Init DataSource
		this.dataSource = new PrecautionQADataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.rolesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);

		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadQuestionList();
		});
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	/**
	 * Load Roles List
	 */
	loadQuestionList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// Call request from server
	// 	this.store.dispatch(new PrecautionQAPageRequested({ page: queryParams }));
    // this.selection.clear();
	this.dataSource = new MatTableDataSource([]);
    this.precautionService.getAllQuestions()
	.subscribe((res) => {
		this.dataSource.data = [];
		const dataArray = res;
		this.dataSource.data = dataArray;
		//this.dataSource= example;
	});
	//this.dataSource= example;		
	}

	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;
		filter.question = searchText;
		return filter;
	}

	/** ACTIONS */
	/**
	 * Delete role
	 *
	 * @param _item: Role
	 */
	deleteQuestion(_item: Role) {
		const _title: string = 'Precaution Question';
		const _description: string = 'Are you sure to permanently delete this question?';
		const _waitDesciption: string = 'Question is deleting...';
		const _deleteMessage = `question has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			// this.store.dispatch(new RoleDeleted({ id: _item.id}));
			// this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			// this.loadRolesList();
			this.precautionService
				.deleteQuestion(_item.id)
				.subscribe((res) => {

					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);

					setTimeout(() => {
						this.loadQuestionList();
					}, 2000);

					let index;
					this.dataSource.data.findIndex((emt, i) => {
						if (emt.id === _item.id) {
							index = i;
						}
					});

					this.dataSource.data.splice(index, 1);
					const dataArray = this.dataSource.data;
					this.dataSource.data = dataArray;
				}
				);
		});
	}

	/** Fetch */
	/**
	 * Fetch selected rows
	 */
	fetchRoles() {
		// const messages = [];
		// this.selection.selected.forEach(elem => {
		// 	messages.push({
		// 		text: `${elem.title}`,
		// 		id: elem.id.toString(),
		// 		// status: elem.username
		// 	});
		// });
		// this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Add role
	 */
	addQuestion() {
		const newQuestion = new PrecautionQAModel();
		newQuestion.clear(); // Set all defaults fields
		this.editQuestion(newQuestion);
	}

	/**
	 * Edit role
	 *
	 * @param role: Role
	 */
	editQuestion(role: PrecautionQAModel) {
		const _saveMessage = `Question successfully has been saved.`;
		const _messageType = role.id ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(PrecautionEditDialogComponent, { data: { id: role.id, question:role.question } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res.isUpdated) {
				return;
			}else{
			this.precautionService.updateQuestion(res).subscribe(
				result=>{
					if (!result) {
						return;
					}
				}
			);
			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
			this.loadQuestionList();
			}
		});
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.rolesResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle selection
	 */
	// masterToggle() {
	// 	if (this.selection.selected.length === this.rolesResult.length) {
	// 		this.selection.clear();
	// 	} else {
	// 		this.rolesResult.forEach(row => this.selection.select(row));
	// 	}
	// }
}
