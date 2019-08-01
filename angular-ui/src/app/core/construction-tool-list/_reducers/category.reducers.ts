// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { CategoryActions, CategoryActionTypes } from '../_actions/category.actions';
// Models
import { CategoryModel } from '../_models/category.model';
import { QueryParamsModel } from '../../_base/crud';

export interface CategorysState extends EntityState<CategoryModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedCategoryId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<CategoryModel> = createEntityAdapter<CategoryModel>();

export const initialCategorysState: CategorysState = adapter.getInitialState({
    categoryForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedCategoryId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function categorysReducer(state = initialCategorysState, action: CategoryActions): CategorysState {
    switch  (action.type) {
        case CategoryActionTypes.CategorysPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedCategoryId: undefined
            };
        }
        case CategoryActionTypes.CategoryActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case CategoryActionTypes.CategoryOnServerCreated: return {
            ...state
        };
        case CategoryActionTypes.CategoryCreated: return adapter.addOne(action.payload.category, {
            ...state, lastCreatedCategoryId: action.payload.category.id
        });
        case CategoryActionTypes.CategoryUpdated: return adapter.updateOne(action.payload.partialCategory, state);
         
        case CategoryActionTypes.OneCategoryDeleted: return adapter.removeOne(action.payload.id, state);
        case CategoryActionTypes.ManyCategorysDeleted: return adapter.removeMany(action.payload.ids, state);
        case CategoryActionTypes.CategorysPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case CategoryActionTypes.CategorysPageLoaded: {
            return adapter.addMany(action.payload.categorys, {
                ...initialCategorysState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getCategoryState = createFeatureSelector<CategoryModel>('certificateQuestions');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
