import { mergeMap, tap } from 'rxjs/operators';
// RxJS
import { delay, distinctUntilChanged, skip, filter, take, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { selectCategorysInStore, selectCategorysPageLoading, selectCategorysShowInitWaitingMessage } from '../_selectors/category.selectors';

export class CategorysDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectCategorysPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectCategorysShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectCategorysInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
