// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { PTWQAModel } from '../_models/ptwqa.model';

export enum QuestionActionTypes {
    QuestionOnServerCreated = '[Edit Question Component] Question On Server Created',
    QuestionCreated = '[Edit Question Component] Question Created',
    QuestionUpdated = '[Edit Question Component] Question Updated',
    QuestionStatusUpdated = '[Question List Page] Question Status Updated',
    OneQuestionDeleted = '[Questions List Page] One Question Deleted',
    ManyQuestionsDeleted = '[Questions List Page] Many Question Deleted',
    QuestionsPageRequested = '[Questions List Page] Questions Page Requested',
    QuestionsPageLoaded = '[Questions API] Questions Page Loaded',
    QuestionsPageCancelled = '[Questions API] Questions Page Cancelled',
    QuestionsPageToggleLoading = '[Questions] Questions Page Toggle Loading',
    QuestionActionToggleLoading = '[Questions] Questions Action Toggle Loading'
}

export class QuestionOnServerCreated implements Action {
    readonly type = QuestionActionTypes.QuestionOnServerCreated;
    constructor(public payload: { question: PTWQAModel }) { }
}

export class QuestionCreated implements Action {
    readonly type = QuestionActionTypes.QuestionCreated;
    constructor(public payload: { que: PTWQAModel }) { }
}

export class QuestionUpdated implements Action {
    readonly type = QuestionActionTypes.QuestionUpdated;
    constructor(public payload: {
        partialQuestion: Update<PTWQAModel>, // For State update
        question: PTWQAModel // For Server update (through service)
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
    readonly type =QuestionActionTypes.OneQuestionDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyQuestionsDeleted implements Action {
    readonly type = QuestionActionTypes.ManyQuestionsDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class QuestionsPageRequested implements Action {
    readonly type = QuestionActionTypes.QuestionsPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class QuestionsPageLoaded implements Action {
    readonly type = QuestionActionTypes.QuestionsPageLoaded;
    constructor(public payload: { questions: PTWQAModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class QuestionsPageCancelled implements Action {
    readonly type = QuestionActionTypes.QuestionsPageCancelled;
}

export class QuestionsPageToggleLoading implements Action {
    readonly type = QuestionActionTypes.QuestionsPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class QuestionActionToggleLoading implements Action {
    readonly type = QuestionActionTypes.QuestionActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type QuestionActions = QuestionOnServerCreated
| QuestionCreated
| QuestionUpdated
//| QuestionsStatusUpdated
| OneQuestionDeleted
| ManyQuestionsDeleted
| QuestionsPageRequested
| QuestionsPageLoaded
| QuestionsPageCancelled
| QuestionsPageToggleLoading
| QuestionActionToggleLoading;
