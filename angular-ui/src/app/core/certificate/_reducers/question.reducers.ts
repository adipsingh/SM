// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { QuestionActions, QuestionActionTypes } from '../_actions/question.actions';
// Models
import { QuestionModel } from '../_models/question.model';
import { QueryParamsModel } from '../../_base/crud';

export interface QuestionsState extends EntityState<QuestionModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedquestionId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<QuestionModel> = createEntityAdapter<QuestionModel>();

export const initialQuestionsState: QuestionsState = adapter.getInitialState({
    //questionForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedquestionId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function questionsReducer(state = initialQuestionsState, action: QuestionActions): QuestionsState {
    switch  (action.type) {
        case QuestionActionTypes.QuestionsPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading,lastCreatedquestionId: undefined
            };
        }
        case QuestionActionTypes.QuestionActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case QuestionActionTypes.QuestionOnServerCreated: return {
            ...state
        };
        case QuestionActionTypes.QuestionCreated: return adapter.addOne(action.payload.que, {
            ...state, lastCreatedquestionId: action.payload.que.id
        });
        case QuestionActionTypes.QuestionUpdated: return adapter.updateOne(action.payload.partialQuestion, state);
        /*case QuestionActionTypes.QuestionStatusUpdated: {
            const _partialQuestions: Update<QuestionModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.questions.length; i++) {
                _partialQuestions.push({
				    id: action.payload.questions[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialCustomers, state);
        }*/
        case QuestionActionTypes.OneQuestionDeleted: return adapter.removeOne(action.payload.id, state);
        case QuestionActionTypes.ManyQuestionsDeleted: return adapter.removeMany(action.payload.ids, state);
        case QuestionActionTypes.QuestionsPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case QuestionActionTypes.QuestionsPageLoaded: {
            return adapter.addMany(action.payload.questions, {
                ...initialQuestionsState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getQuestionState = createFeatureSelector<QuestionModel>('questions');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
