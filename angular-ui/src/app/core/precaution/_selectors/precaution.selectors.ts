// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import {  PrecautionQAState } from '../_reducers/precaution.reducers';
import { PrecautionQAModel } from '../_models/precaution.model';

export const selectPrecautionQAState = createFeatureSelector<PrecautionQAState>('certificateQuestions');

export const selectQuestionById = (QuestionId: number) => createSelector(
    selectPrecautionQAState,
    questionsState => questionsState.entities[QuestionId]
);

export const selectPrecautinoQAPageLoading = createSelector(
    selectPrecautionQAState,
    QuestionsState => QuestionsState.listLoading
);

export const selectPrecautionQAActionLoading = createSelector(
    selectPrecautionQAState,
    QuestionsState => QuestionsState.actionsloading
);

export const selectLastCreatedPrecautionQAId = createSelector(
    selectPrecautionQAState,
    QuestionsState => QuestionsState.listLoading
);

export const selectPrecautionQAShowInitWaitingMessage = createSelector(
    selectPrecautionQAState,
    QuestionsState => QuestionsState.showInitWaitingMessage
);

export const selectPrecautionQAInStore = createSelector(
    selectPrecautionQAState,
    QuestionsState => {
        const items: PrecautionQAModel[] = [];
        each(QuestionsState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: PrecautionQAModel[] = httpExtension.sortArray(items, QuestionsState.lastQuery.sortField, QuestionsState.lastQuery.sortOrder);
        return new QueryResultsModel(result, QuestionsState.totalCount, '');
    }
);
