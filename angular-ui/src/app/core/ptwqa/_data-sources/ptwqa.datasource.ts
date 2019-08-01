//import { mergeMap, tap } from 'rxjs/operators';
// RxJS
//import { delay, distinctUntilChanged } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { selectQuestionsInStore, selectQuestionsPageLoading, selectQuestionsShowInitWaitingMessage } from '../_selectors/ptwqa.selectors';

export class PTWQADataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();
		this.loading$ = this.store.pipe(
			select(selectQuestionsPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectQuestionsShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectQuestionsInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
