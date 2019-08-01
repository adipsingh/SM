import { mergeMap, tap } from 'rxjs/operators';
// RxJS
import { delay, distinctUntilChanged, skip, filter, take, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { selectPrecautionQAInStore, //selectPrecautionQAPageLoading, 
	selectPrecautionQAShowInitWaitingMessage } from '../_selectors/precaution.selectors';

export class PrecautionQADataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		// this.loading$ = this.store.pipe(
		// 	select(selectPrecautionQAPageLoading),
		// );

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectPrecautionQAShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectPrecautionQAInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
