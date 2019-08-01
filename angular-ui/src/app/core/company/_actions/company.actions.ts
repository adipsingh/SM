// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { CompanyModel } from '../_models/company.model';

export enum CompanyActionTypes {
    QuestionOnServerCreated = '[Edit Question Component] Question On Server Created',
    QuestionCreated = '[Edit Question Component] Question Created',
    QuestionUpdated = '[Edit Question Component] Question Updated',
    QuestionStatusUpdated = '[Question List Page] Question Status Updated',
    OneQuestionDeleted = '[Questions List Page] One Question Deleted',
    ManyQuestionsDeleted = '[Questions List Page] Many Question Deleted',
    CompanysPageRequested = '[Company List Page] Companys Page Requested',
    QuestionsPageLoaded = '[Questions API] Questions Page Loaded',
    QuestionsPageCancelled = '[Questions API] Questions Page Cancelled',
    QuestionsPageToggleLoading = '[Questions] Questions Page Toggle Loading',
    QuestionActionToggleLoading = '[Questions] Questions Action Toggle Loading'
}

export class QuestionOnServerCreated implements Action {
    readonly type = CompanyActionTypes.QuestionOnServerCreated;
    constructor(public payload: { question: CompanyModel }) { }
}

export class QuestionCreated implements Action {
    readonly type = CompanyActionTypes.QuestionCreated;
    constructor(public payload: { que: CompanyModel }) { }
}

export class QuestionUpdated implements Action {
    readonly type = CompanyActionTypes.QuestionUpdated;
    constructor(public payload: {
        partialQuestion: Update<CompanyModel>, // For State update
        question: CompanyModel // For Server update (through service)
    }) { }
}

/*export class QuestionsStatusUpdated implements Action {
    readonly type = QuestionActionTypes.QuestionStatusUpdated;
    constructor(public payload: {
        questions: QuestionModel[],
        status: number
    }) { }
}*/

export class OneQuestionDeleted implements Action {
    readonly type =CompanyActionTypes.OneQuestionDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyQuestionsDeleted implements Action {
    readonly type = CompanyActionTypes.ManyQuestionsDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class CompanysPageRequested implements Action {
    readonly type = CompanyActionTypes.CompanysPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class QuestionsPageLoaded implements Action {
    readonly type = CompanyActionTypes.QuestionsPageLoaded;
    constructor(public payload: { questions: CompanyModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class QuestionsPageCancelled implements Action {
    readonly type = CompanyActionTypes.QuestionsPageCancelled;
}

export class QuestionsPageToggleLoading implements Action {
    readonly type = CompanyActionTypes.QuestionsPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class QuestionActionToggleLoading implements Action {
    readonly type = CompanyActionTypes.QuestionActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type CompanyActions = QuestionOnServerCreated
| QuestionCreated
| QuestionUpdated
//| QuestionsStatusUpdated
| OneQuestionDeleted
| ManyQuestionsDeleted
| CompanysPageRequested
| QuestionsPageLoaded
| QuestionsPageCancelled
| QuestionsPageToggleLoading
| QuestionActionToggleLoading;
