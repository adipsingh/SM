// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { QuestionsState } from '../_reducers/question.reducers';
import { QuestionModel } from '../_models/question.model';

export const selectQuestionsState = createFeatureSelector<QuestionsState>('Questions');

export const selectQuestionById = (QuestionId: number) => createSelector(
    selectQuestionsState,
    QuestionsState => QuestionsState.entities[QuestionId]
);

export const selectQuestionsPageLoading = createSelector(
    selectQuestionsState,
    QuestionsState => QuestionsState.listLoading
);

export const selectQuestionsActionLoading = createSelector(
    selectQuestionsState,
    QuestionsState => QuestionsState.actionsloading
);

export const selectLastCreatedQuestionId = createSelector(
    selectQuestionsState,
    QuestionsState => QuestionsState.lastCreatedquestionId
);

export const selectQuestionsShowInitWaitingMessage = createSelector(
    selectQuestionsState,
    questionsState => questionsState.showInitWaitingMessage
);

export const selectQuestionsInStore = createSelector(
    selectQuestionsState,
    questionsState => {
        const items: QuestionModel[] = [];
        each(questionsState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: QuestionModel[] = httpExtension.sortArray(items, questionsState.lastQuery.sortField, questionsState.lastQuery.sortOrder);
        return new QueryResultsModel(result, questionsState.totalCount, '');
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
