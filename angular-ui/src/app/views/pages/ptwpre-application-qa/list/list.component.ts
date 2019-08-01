import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PTWQADataSource, PTWQAModel, PTWQAService, QuestionsPageRequested, OneQuestionDeleted } from '../../../../../../src/app/core/ptwqa';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { QueryParamsModel, LayoutUtilsService, MessageType } from '../../../../../../src/app/core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../../../../../../src/app/core/reducers';
import { Store } from '@ngrx/store';
import { tap, skip, distinctUntilChanged, take, delay } from 'rxjs/operators';
import { EditComponent } from '../edit/edit.component';


@Component({
	selector: 'kt-list',
	templateUrl: './list.component.html'
	//styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	dataSource: PTWQADataSource;
	displayedColumns = ['select', 'id', 'questions', 'Cold', 'Hot', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	lastQuery: QueryParamsModel;
	// Selection
	selection = new SelectionModel<PTWQAModel>(true, []);
	questionResult: PTWQAModel[] = [];
	filterStatus: string = '';
	filterType: string = '';
	filterCondition: string = '';
	// Subscriptions
	private subscriptions: Subscription[] = [];
	constructor(
		private ptw: PTWQAService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>) { }

	ngOnInit() {

		// If the user changes the sort order, reset back to the first page.
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => this.loadQuestionsList())
		)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		// Init DataSource
		this.dataSource = new PTWQADataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.questionResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadQuestionsList();
		}); // Remove this line, just loading imitation
	}


	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadQuestionsList() {
		debugger;
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);

		this.ptw.getAllQuestions(queryParams) // this is for real 

			.subscribe(response => {
				this.questionResult = response.items;
			},
				err => console.log(err), () => console.log(this.questionResult)
			);

		this.store.dispatch(new QuestionsPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;
		filter.id = searchText;
		return filter;
		// const filter: any = {};
		// const searchText: string = this.searchInput.nativeElement.value;

		// if (this.filterStatus && this.filterStatus.length > 0) {
		// 	filter.status = +this.filterStatus;
		// }

		// if (this.filterType && this.filterType.length > 0) {
		// 	filter.type = +this.filterType;
		// }

		// filter.id = searchText;
		// if (!searchText) {
		// 	return filter;
		// }  
	}


	deleteQuestion(_item: PTWQAModel) {
		//this.auth.deleteUser(_item.id)
		//debugger;
		const _title: string = 'Question Delete';
		const _description: string = 'Are you sure to permanently delete this Question?';
		const _waitDesciption: string = 'Question is deleting...';
		const _deleteMessage = `Question has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OneQuestionDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

	// addQuestion() {
	// 	const newQuestion = new PTWQAModel();
	// 	newQuestion.clear(); // Set all defaults fields
	// 	this.editQuestion(newQuestion);
	// }


	fetchQuestion() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.questions}`,
				id: elem.id.toString()
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.questionResult.length;
		return numSelected === numRows;
	}

	//chnage edit component once PTWQA edit component created
	editQuestion(newQuestion: PTWQAModel) {
		let saveMessageTranslateParam = 'CERTIFICATEQA.QUESTIONS.EDIT.';
		saveMessageTranslateParam += newQuestion.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = newQuestion.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(EditComponent, { data: { newQuestion } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadQuestionsList();
		});
	}
}
