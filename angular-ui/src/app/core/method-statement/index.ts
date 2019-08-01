import { from } from 'rxjs';

// Models and Consts
export { CategoryModel } from './_models/method.model';
 
// DataSources
export { CategorysDataSource } from './_data-sources/method.datasource';
// Data Context
export { methodDataContext } from './_server/method.data-context';
// Actions 
export {
    CategoryActionTypes,
    CategoryActions,
    CategoryOnServerCreated,
    CategoryCreated,
    CategoryUpdated, 
    OneCategoryDeleted,
    ManyCategorysDeleted,
    CategorysPageRequested,
    CategorysPageLoaded,
    CategorysPageCancelled,
    CategorysPageToggleLoading
} from './_actions/method.actions';

// Effects
export { CategoryEffects } from './_effects/method.effects';

// Reducers
export { categorysReducer } from './_reducers/method.reducers';

// Selectors 
export {
    selectCategoryById,
    selectCategorysInStore,
    selectCategorysPageLoading,
    selectLastCreatedCategoryId,
    selectCategorysActionLoading,
    selectCategorysShowInitWaitingMessage
} from './_selectors/method.selectors';
 

// Services
export { MethodService } from './_services/';
