// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import {  PrecautionQAActions, PrecautionQAActionTypes } from '../_actions/precaution.actions';
// Models
import { PrecautionQAModel } from '../_models/precaution.model';
import { QueryParamsModel } from '../../_base/crud';

export interface PrecautionQAState extends EntityState<PrecautionQAModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
   // lastCreatedQuestionId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<PrecautionQAModel> = createEntityAdapter<PrecautionQAModel>();

export const initialPrecautionState: PrecautionQAState = adapter.getInitialState({
    //QuestionForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    //lastCreatedQuestionId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function PrecautionQAReducer(state = initialPrecautionState, action: PrecautionQAActions): PrecautionQAState {
    switch  (action.type) {
        case PrecautionQAActionTypes.PrecautionQAPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, //lastCreatedQuestionId: undefined
            };
        }
        case PrecautionQAActionTypes.PrecautionQAActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case PrecautionQAActionTypes.PrecautionQAOnServerCreated: return {
            ...state
        };
        case PrecautionQAActionTypes.PrecautionQACreated: return adapter.addOne(action.payload.question, {
            ...state, lastCreatedQuestionId: action.payload.question.id
        });
        // case PrecautionQAActionTypes.PrecautionQAPageRequested: return adapter.getSelectors(action.payload.question, {
        //     ...state, lastCreatedQuestionId: action.payload.question.id
        // });
        case PrecautionQAActionTypes.PrecautionQAUpdated: return adapter.updateOne(action.payload.partialQuestion, state);
        // case CustomerActionTypes.CustomersStatusUpdated: {
        //     const _partialCustomers: Update<CustomerModel>[] = [];
        //     // tslint:disable-next-line:prefer-const
        //     for (let i = 0; i < action.payload.customers.length; i++) {
        //         _partialCustomers.push({
		// 		    id: action.payload.customers[i].id,
		// 		    changes: {
        //                 status: action.payload.status
        //             }
		// 	    });
        //     }
        //     return adapter.updateMany(_partialCustomers, state);
        // }
        case PrecautionQAActionTypes.OnePrecautionQADeleted: return adapter.removeOne(action.payload.id, state);
        case PrecautionQAActionTypes.ManyPrecautionQAsDeleted: return adapter.removeMany(action.payload.ids, state);
        case PrecautionQAActionTypes.PrecautionQAPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case PrecautionQAActionTypes.PrecautionQAPageLoaded: {
            return adapter.addMany(action.payload.questions, {
                ...initialPrecautionState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getQuestionState = createFeatureSelector<PrecautionQAModel>('certificateQuestions');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
