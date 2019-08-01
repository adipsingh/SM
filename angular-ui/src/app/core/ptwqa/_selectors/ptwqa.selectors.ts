// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { PTWQAState } from '../_reducers/ptwqa.reducers';
import { PTWQAModel } from '../_models/ptwqa.model';

export const selectQuestionsState = createFeatureSelector<PTWQAState>('questions');

export const selectQuestionById = (QuestionId: number) => createSelector(
    selectQuestionsState,
    qaState => qaState.entities[QuestionId]
);

export const selectQuestionsPageLoading = createSelector(
    selectQuestionsState,
    qaState => {
        return qaState.listLoading;
    }
);

export const selectQuestionsActionLoading = createSelector(
    selectQuestionsState,
    qaState => qaState.actionsloading
);

export const selectLastCreatedQuestionId = createSelector(
    selectQuestionsState,
    qaState => qaState.lastCreatedquestionId
);

export const selectQuestionsShowInitWaitingMessage = createSelector(
    selectQuestionsState,
    qaState => qaState.showInitWaitingMessage
);

export const selectQuestionsInStore = createSelector(
    selectQuestionsState,
    qaState => {
        const items: PTWQAModel[] = [];
        each(qaState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: PTWQAModel[] = httpExtension.sortArray(items, qaState.lastQuery.sortField, qaState.lastQuery.sortOrder);
        return new QueryResultsModel(result, qaState.totalCount, '');
    }
);

export const selectHasQuestionsInStore = createSelector(
    selectQuestionsInStore,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
