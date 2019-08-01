import { QueryParamsModel } from '../../_base/crud/models/query-models/query-params.model';
import { forkJoin } from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, delay } from 'rxjs/operators';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel } from '../../_base/crud';
// Services
import { Categoryervice } from '../_services/category.services';
// State
import { AppState } from '../../reducers';
// Actions
import {
    CategoryActionTypes,
    CategorysPageRequested,
    CategorysPageLoaded,
    ManyCategorysDeleted,
    OneCategoryDeleted,
    CategoryActionToggleLoading,
    CategorysPageToggleLoading,
    CategoryUpdated, 
    CategoryCreated,
    CategoryOnServerCreated
} from '../_actions/category.actions';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffects {
    showPageLoadingDistpatcher = new CategorysPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new CategoryActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new CategoryActionToggleLoading({ isLoading: false });

    @Effect()
    loadCategorysPage$ = this.actions$.pipe(
        ofType<CategorysPageRequested>(CategoryActionTypes.CategorysPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.customersService.findCategory(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: QueryResultsModel = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new CategorysPageLoaded({
                categorys: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deleteCategory$ = this.actions$
        .pipe(
            ofType<OneCategoryDeleted>(CategoryActionTypes.OneCategoryDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.customersService.deleteCategory(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        ); 

    @Effect()
    updateCategory$ = this.actions$
        .pipe(
            ofType<CategoryUpdated>(CategoryActionTypes.CategoryUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.customersService.updateCategory(payload.category);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        ); 

    // @Effect()
    // createCategory$ = this.actions$
    //     .pipe(
    //         ofType<CategoryOnServerCreated>(CategoryActionTypes.CategoryOnServerCreated),
    //         mergeMap(( { payload } ) => {
    //             this.store.dispatch(this.showActionLoadingDistpatcher);
    //             return this.customersService.createCategory(payload.category).pipe(
    //                 tap(res => {
    //                     this.store.dispatch(new CategoryCreated({ category: res }));
    //                 })
    //             );
    //         }),
    //         map(() => {
    //             return this.hideActionLoadingDistpatcher;
    //         }),
    //     );

    constructor(private actions$: Actions, private customersService: Categoryervice, private store: Store<AppState>) { }
}
