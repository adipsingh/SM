import { QueryParamsModel } from './../../_base/crud/models/query-models/query-params.model';
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
import { PrecautionQAService } from '../_services/';
// State
import { AppState } from '../../../core/reducers';
// Actions
import {
    PrecautionQAActionTypes,
    PrecautionQAPageRequested,
    PrecautionQAPageLoaded,
    ManyPrecautionQADeleted,
    OnePrecautionQADeleted,
    PrecautionQAActionToggleLoading,
    PrecautionQAPageToggleLoading,
    PrecautionQAUpdated,
    PrecautionQAStatusUpdated,
    PrecautionQACreated,
    PrecautionQAOnServerCreated
} from '../_actions/precaution.actions';
import { of } from 'rxjs';

@Injectable()
export class PrecautionQAEffects {
    showPageLoadingDistpatcher = new PrecautionQAPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new PrecautionQAActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new PrecautionQAActionToggleLoading({ isLoading: false });

    constructor(private actions$: Actions, private precautionQAService: PrecautionQAService, private store: Store<AppState>) { }

    @Effect()
    // loadPrecautionQAPage$ = this.actions$.pipe(
    //     ofType<PrecautionQAPageRequested>(PrecautionQAActionTypes.PrecautionQAPageRequested),
    //     mergeMap(( {payload} ) => {
    //         this.store.dispatch(this.showPageLoadingDistpatcher);
    //         const requestToServer =this.precautionQAService.getAllQuestions();// findQuestions(payload.page);
    //         const lastQuery = of(payload.page);
    //         return forkJoin(requestToServer, lastQuery);
    //        return requestToServer;
    //     }),
    //     map(response => {
    //         const result: QueryResultsModel = response;
    //       //  const lastQuery: QueryParamsModel = response[1];
    //         const pageLoadedDispatch = new PrecautionQAPageLoaded({
    //            // questions: response[0],
    //             totalCount: result.totalCount,
    //            // page: lastQuery
    //         });
    //         return pageLoadedDispatch;
    //     })
    // );

    @Effect()
    deleteQuestion$ = this.actions$
        .pipe(
            ofType<OnePrecautionQADeleted>(PrecautionQAActionTypes.OnePrecautionQADeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.precautionQAService.deleteQuestion(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteQuestions$ = this.actions$
        .pipe(
            ofType<ManyPrecautionQADeleted>(PrecautionQAActionTypes.ManyPrecautionQAsDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.precautionQAService.deleteQuestions(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateQuestion$ = this.actions$
        .pipe(
            ofType<PrecautionQAUpdated>(PrecautionQAActionTypes.PrecautionQAUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.precautionQAService.updateQuestion(payload.question);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updateQuestionsStatus$ = this.actions$
        .pipe(
            ofType<PrecautionQAStatusUpdated>(PrecautionQAActionTypes.PrecautionQAStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.precautionQAService.updateStatusForQuestion(payload.questions, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createQuestion$ = this.actions$
        .pipe(
            ofType<PrecautionQAOnServerCreated>(PrecautionQAActionTypes.PrecautionQAOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.precautionQAService.createPrecautionQA(payload.question).pipe(
                    tap(res => {
                        this.store.dispatch(new PrecautionQACreated({ question: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    
}
