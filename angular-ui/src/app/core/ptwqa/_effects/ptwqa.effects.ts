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
import{PTWQAService}from '../_services/ptwqa.service'

import {
    QuestionActionTypes,
    QuestionsPageRequested,
    QuestionsPageLoaded,
    ManyQuestionsDeleted,
    OneQuestionDeleted,
    QuestionActionToggleLoading,
    QuestionsPageToggleLoading,
    QuestionUpdated,
    //QuestionsStatusUpdated,
    QuestionOnServerCreated,
    QuestionCreated} from '../_actions/ptwqa.actions';
import { of } from 'rxjs';

@Injectable()
export class QuestionEffects {
    showPageLoadingDistpatcher = new QuestionsPageToggleLoading({ isLoading: true });
    showLoadingDistpatcher = new QuestionsPageToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new QuestionActionToggleLoading({ isLoading: false });

    @Effect()
    loadQuestionsPage$ = this.actions$
    .pipe(
        ofType<QuestionsPageRequested>(QuestionActionTypes.QuestionsPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.ptwqaService.getAllQuestions(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
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
    deleteQuestion$ = this.actions$
        .pipe(
            ofType<OneQuestionDeleted>(QuestionActionTypes.OneQuestionDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showLoadingDistpatcher);
                    return this.ptwqaService.deleteQuestion(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteQuestions$ = this.actions$
        .pipe(
            ofType<ManyQuestionsDeleted>(QuestionActionTypes.ManyQuestionsDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showLoadingDistpatcher);
                    return this.ptwqaService.deleteQuestions(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateQuestion$ = this.actions$
        .pipe(
            ofType<QuestionUpdated>(QuestionActionTypes.QuestionUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showLoadingDistpatcher);
                return this.ptwqaService.updateQuestion(payload.question);
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
    createQuestion$ = this.actions$
        .pipe(
            ofType<QuestionOnServerCreated>(QuestionActionTypes.QuestionOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showLoadingDistpatcher);
                return this.ptwqaService.createQuestion(payload.question).pipe(
                    tap(res => {
                        this.store.dispatch(new QuestionCreated({ que: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private ptwqaService: PTWQAService, private store: Store<AppState>) { }
}
