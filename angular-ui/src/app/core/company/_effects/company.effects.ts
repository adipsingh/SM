import { forkJoin } from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel,QueryParamsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
// Actions
import{ CompanyService }from '../_services/'

import {
    CompanyActionTypes,
    CompanysPageRequested,
    QuestionsPageLoaded,
    ManyQuestionsDeleted,
    OneQuestionDeleted,
    QuestionActionToggleLoading,
    QuestionsPageToggleLoading,
    QuestionUpdated,
    //QuestionsStatusUpdated,
    QuestionOnServerCreated,
    QuestionCreated} from '../_actions/company.actions';
import { of } from 'rxjs';

@Injectable()
export class CompanyEffects {
    showPageLoadingDistpatcher = new QuestionsPageToggleLoading({ isLoading: true });
    showLoadingDistpatcher = new QuestionsPageToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new QuestionsPageToggleLoading({ isLoading: false });

    @Effect()
    loadCompanysPage$ = this.actions$
    .pipe(
        ofType<CompanysPageRequested>(CompanyActionTypes.CompanysPageRequested),
        mergeMap(( { payload } ) => {
            debugger;
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.companyService.findCompanys(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            debugger;
            console.log("response :: ",response);
            const result: QueryResultsModel = response[0];
            const lastQuery: QueryParamsModel = response[1];
            return  new QuestionsPageLoaded({
                questions: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });            
        }),
    );

    @Effect()
    deleteCompany$ = this.actions$
        .pipe(
            ofType<OneQuestionDeleted>(CompanyActionTypes.OneQuestionDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showLoadingDistpatcher);
                    return this.companyService.deleteCompany(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteCompanys$ = this.actions$
        .pipe(
            ofType<ManyQuestionsDeleted>(CompanyActionTypes.ManyQuestionsDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showLoadingDistpatcher);
                    return this.companyService.deleteCompanys(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateCompany$ = this.actions$
        .pipe(
            ofType<QuestionUpdated>(CompanyActionTypes.QuestionUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showLoadingDistpatcher);
                return this.companyService.updateCompany(payload.question);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

   /* @Effect()
    updateQuestionsStatus$ = this.actions$
        .pipe(
            ofType<QuestionsStatusUpdated>(QuestionActionTypes.QuestionStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.questionsService.updateStatusForQuestion(payload.questions, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );*/

    @Effect()
    createCompany$ = this.actions$
        .pipe(
            ofType<QuestionOnServerCreated>(CompanyActionTypes.QuestionOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showLoadingDistpatcher);
                return this.companyService.createCompany(payload.question).pipe(
                    tap(res => {
                        this.store.dispatch(new QuestionCreated({ que: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private companyService: CompanyService, private store: Store<AppState>) { }
}
