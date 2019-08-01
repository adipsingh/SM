// NGRX
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { CategoryModel } from '../_models/category.model';

export enum CategoryActionTypes {
    CategoryOnServerCreated = '[Edit Category Dialog] Category On Server Created',
    CategoryCreated = '[Edit Category Dialog] Category Created',
    CategoryUpdated = '[Edit Category Dialog] Category Updated',
    CategorysStatusUpdated = '[Category List Page] Categorys Status Updated',
    OneCategoryDeleted = '[Categorys List Page] One Category Deleted',
    ManyCategorysDeleted = '[Categorys List Page] Many Category Deleted',
    CategorysPageRequested = '[Categorys List Page] Categorys Page Requested',
    CategorysPageLoaded = '[Categorys API] Categorys Page Loaded',
    CategorysPageCancelled = '[Categorys API] Categorys Page Cancelled',
    CategorysPageToggleLoading = '[Categorys] Categorys Page Toggle Loading',
    CategoryActionToggleLoading = '[Categorys] Categorys Action Toggle Loading'
}

export class CategoryOnServerCreated implements Action {
    readonly type = CategoryActionTypes.CategoryOnServerCreated;
    constructor(public payload: { category: CategoryModel }) { }
}

export class CategoryCreated implements Action {
    readonly type = CategoryActionTypes.CategoryCreated;
    constructor(public payload: { category: CategoryModel }) { }
}

export class CategoryUpdated implements Action {
    readonly type = CategoryActionTypes.CategoryUpdated;
    constructor(public payload: {
        partialCategory: Update<CategoryModel>, // For State update
        category: CategoryModel // For Server update (through service)
    }) { }
}
 

export class OneCategoryDeleted implements Action {
    readonly type = CategoryActionTypes.OneCategoryDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyCategorysDeleted implements Action {
    readonly type = CategoryActionTypes.ManyCategorysDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class CategorysPageRequested implements Action {
    readonly type = CategoryActionTypes.CategorysPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class CategorysPageLoaded implements Action {
    readonly type = CategoryActionTypes.CategorysPageLoaded;
    constructor(public payload: { categorys: CategoryModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class CategorysPageCancelled implements Action {
    readonly type = CategoryActionTypes.CategorysPageCancelled;
}

export class CategorysPageToggleLoading implements Action {
    readonly type = CategoryActionTypes.CategorysPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class CategoryActionToggleLoading implements Action {
    readonly type = CategoryActionTypes.CategoryActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type CategoryActions = CategoryOnServerCreated
| CategoryCreated
| CategoryUpdated 
| OneCategoryDeleted
| ManyCategorysDeleted
| CategorysPageRequested
| CategorysPageLoaded
| CategorysPageCancelled
| CategorysPageToggleLoading
| CategoryActionToggleLoading;
