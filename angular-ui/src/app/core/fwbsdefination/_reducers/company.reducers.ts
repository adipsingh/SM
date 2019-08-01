// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { CompanyActions, CompanyActionTypes } from '../_actions/company.actions';
// Models
import { CompanyModel } from '../_models/company.model';
import { QueryParamsModel } from '../../_base/crud';

export interface CompanyState extends EntityState<CompanyModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedcompanyId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<CompanyModel> = createEntityAdapter<CompanyModel>();

export const initialCompanyState: CompanyState = adapter.getInitialState({
    //questionForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedcompanyId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: false
});

export function companyReducer(state = initialCompanyState, action: CompanyActions): CompanyState {
    switch  (action.type) {
        case CompanyActionTypes.QuestionsPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading,lastCreatedcompanyId: undefined
            };
        }
        case CompanyActionTypes.QuestionActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case CompanyActionTypes.QuestionOnServerCreated: return {
            ...state
        };
        case CompanyActionTypes.QuestionCreated: return adapter.addOne(action.payload.que, {
            ...state, lastCreatedquestionId: action.payload.que.id
        });
        case CompanyActionTypes.QuestionUpdated: return adapter.updateOne(action.payload.partialQuestion, state);
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
        case CompanyActionTypes.OneQuestionDeleted: return adapter.removeOne(action.payload.id, state);
        case CompanyActionTypes.ManyQuestionsDeleted: return adapter.removeMany(action.payload.ids, state);
        case CompanyActionTypes.QuestionsPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case CompanyActionTypes.QuestionsPageLoaded: {
            return adapter.addMany(action.payload.questions, {
                ...initialCompanyState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: true
            });
        }
        default: return state;
    }
}

export const getCompanysState = createFeatureSelector<CompanyModel>('companys');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
