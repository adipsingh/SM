// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { CompanyState } from '../_reducers/company.reducers';
import { CompanyModel } from '../_models/company.model';

export const selectCompanyState = createFeatureSelector<CompanyState>('companys');

export const selectQuestionById = (CompanyId: number) => createSelector(
    selectCompanyState,
    CompanyState => CompanyState.entities[CompanyId]
);

export const selectCompanyPageLoading = createSelector(
    selectCompanyState,
    CompanyState => CompanyState.listLoading
);

export const selectCompanyActionLoading = createSelector(
    selectCompanyState,
    CompanyState => CompanyState.actionsloading
);

export const selectLastCreatedCompanyId = createSelector(
    selectCompanyState,
    CompanyState => CompanyState.lastCreatedcompanyId
);

export const selectCompanyShowInitWaitingMessage = createSelector(
    selectCompanyState,
    CompanyState => CompanyState.showInitWaitingMessage
);

export const selectCompanyInStore = createSelector(
    selectCompanyState,
    CompanyState => {
        const items: CompanyModel[] = [];
        each(CompanyState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: CompanyModel[] = httpExtension.sortArray(items, CompanyState.lastQuery.sortField, CompanyState.lastQuery.sortOrder);
        return new QueryResultsModel(result, CompanyState.totalCount, '');
    }
);

export const selectHasQuestionsInStore = createSelector(
    selectCompanyInStore,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
