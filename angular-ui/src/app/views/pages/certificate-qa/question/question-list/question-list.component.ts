import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuestionsDataSource, QuestionModel, QuestionsPageRequested, OneQuestionDeleted, ManyQuestionsDeleted, QuestionsService } from '../../../../../../../src/app/core/certificate-qa';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { LayoutUtilsService, QueryParamsModel, MessageType } from '../../../../../../../src/app/core/_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../../src/app/core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, take, delay } from 'rxjs/operators';
import { QuestionEditComponent } from '../question-edit/question-edit.component';

@Component({
  selector: 'kt-question-list',
  templateUrl: './question-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class QuestionListComponent implements OnInit,OnDestroy {
	//Table Fields
	dataSource: QuestionsDataSource;
	displayedColumns = ['select','id', 'question', 'excavation', 'confinedSpace', 'radioGraphy', 'energization', 'electrical','criticalLift','gratingRemoval','actions'];
	  
	@ViewChild(MatPaginator) paginator: MatPaginator;
 	@ViewChild('sort1') sort: MatSort;
	  
	 //Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	filterCondition: string = '';
	// Selection
	selection = new SelectionModel<QuestionModel>(true, []);
  	questionsResult: QuestionModel[] = [];
	  
	  //Subscriptions
	private subscriptions: Subscription[] = [];
  	constructor(
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
    
   		 // Filtration, bind to searchInput
		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
		// tslint:disable-next-line:max-line-length
		debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
		distinctUntilChanged(), // This operator will eliminate duplicate values
		tap(() => {
			this.paginator.pageIndex = 0;
			this.loadQuestionsList();
		})
		)
		.subscribe();
    this.subscriptions.push(searchSubscription);
    
    // Init DataSource
		this.dataSource = new QuestionsDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.questionsResult = res;
		});
    this.subscriptions.push(entitiesSubscription);
    of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadQuestionsList();
		}); // Remove this line, just loading imitation

  }

  /**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

  loadQuestionsList() {
    this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.store.dispatch(new QuestionsPageRequested({ page: queryParams }));
		this.selection.clear();
  }
  filterConfiguration(): any {
    const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.id = searchText;
		if (!searchText) {
			return filter;
		}    
  }



  /** ACTIONS */
	/**
	 * Delete Question
	 *
	 * @param _item: QuestionModel
	 */
	deleteQuestion(_item: QuestionModel) {
		const _title: string = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_SIMPLE.TITLE');
		const _description: string = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_SIMPLE.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OneQuestionDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
  }
  


  /**
	 * Delete selected Question
	 */
	deleteQuestions() {
		const _title: string = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_MULTY.TITLE');
		const _description: string = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_MULTY.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_MULTY.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('CERTIFICATEQA.QUESTIONS.DELETE_QUESTION_MULTY.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.store.dispatch(new ManyQuestionsDeleted({ ids: idsForDeletion }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
  }
  

  /**
	 * Show add Question dialog
	 */
	addQuestion() {
		const newQuestion = new QuestionModel();
		newQuestion.clear(); // Set all defaults fields
		this.editQuestion(newQuestion);
	}
  editQuestion(newQuestion: QuestionModel) {
    let saveMessageTranslateParam = 'CERTIFICATEQA.QUESTIONS.EDIT.';
		saveMessageTranslateParam += newQuestion.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = newQuestion.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(QuestionEditComponent, { data: { newQuestion } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadQuestionsList();
		});
  }

  isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.questionsResult.length;
		return numSelected === numRows;
  }
  

  /**
	 * Toggle all selections
	 */
	masterToggle() {
		if (this.selection.selected.length === this.questionsResult.length) {
			this.selection.clear();
		} else {
			this.questionsResult.forEach(row => this.selection.select(row));
		}
	}



}
