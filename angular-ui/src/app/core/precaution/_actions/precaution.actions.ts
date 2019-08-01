// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { PrecautionQAModel } from '../_models/precaution.model';

export enum PrecautionQAActionTypes {
    PrecautionQAOnServerCreated = '[Edit Question Dialog] Question On Server Created',
    PrecautionQACreated = '[Edit Question Dialog] Question Created',
    PrecautionQAUpdated = '[Edit Question Dialog] Question Updated',
    PrecautionQAStatusUpdated = '[Question List Page] Questions Status Updated',
    OnePrecautionQADeleted = '[Questions List Page] One Question Deleted',
    ManyPrecautionQAsDeleted = '[Questions List Page] Many Question Deleted',
    PrecautionQAPageRequested = '[Questions List Page] Questions Page Requested',
    PrecautionQAPageLoaded = '[Questions API] Questions Page Loaded',
    PrecautionQAPageCancelled = '[Questions API] Questions Page Cancelled',
    PrecautionQAPageToggleLoading = '[Questions] Questions Page Toggle Loading',
    PrecautionQAActionToggleLoading = '[Questions] Questions Action Toggle Loading'
}

export class PrecautionQAOnServerCreated implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAOnServerCreated;
    constructor(public payload: { question: PrecautionQAModel }) { }
}

export class PrecautionQACreated implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQACreated;
    constructor(public payload: { question: PrecautionQAModel }) { }
}

export class PrecautionQAUpdated implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAUpdated;
    constructor(public payload: {
        partialQuestion: Update<PrecautionQAModel>, // For State update
        question: PrecautionQAModel // For Server update (through service)
    }) { }
}

export class PrecautionQAStatusUpdated implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAStatusUpdated;
    constructor(public payload: {
        questions: PrecautionQAModel[],
        status: number
    }) { }
}

export class OnePrecautionQADeleted implements Action {
    readonly type = PrecautionQAActionTypes.OnePrecautionQADeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyPrecautionQADeleted implements Action {
    readonly type = PrecautionQAActionTypes.ManyPrecautionQAsDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class PrecautionQAPageRequested implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class PrecautionQAPageLoaded implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAPageLoaded;
    constructor(public payload: { questions: PrecautionQAModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class PrecautionQAPageCancelled implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAPageCancelled;
}

export class PrecautionQAPageToggleLoading implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class PrecautionQAActionToggleLoading implements Action {
    readonly type = PrecautionQAActionTypes.PrecautionQAActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type PrecautionQAActions = PrecautionQAOnServerCreated
| PrecautionQACreated
| PrecautionQAUpdated
| PrecautionQAStatusUpdated
| OnePrecautionQADeleted
| ManyPrecautionQADeleted
| PrecautionQAPageRequested
| PrecautionQAPageLoaded
| PrecautionQAPageCancelled
| PrecautionQAPageToggleLoading
| PrecautionQAActionToggleLoading;
