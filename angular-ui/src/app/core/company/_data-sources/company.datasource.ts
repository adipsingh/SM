//import { mergeMap, tap } from 'rxjs/operators';
// RxJS
//import { delay, distinctUntilChanged } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { selectCompanyInStore, selectCompanyPageLoading, selectCompanyShowInitWaitingMessage } from '../_selectors/company.selectors';

export class CompanyDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();
		this.loading$ = this.store.pipe(
			select(selectCompanyPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectCompanyShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectCompanyInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
