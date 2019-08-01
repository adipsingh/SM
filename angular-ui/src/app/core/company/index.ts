// Context
export { CompanyDetailsContext } from './_server/company.data-context';

// Models and Consts
export { CompanyModel } from './_models/company.model';
export { SPECIFICATIONS_DICTIONARY } from './_consts/specification.dictionary';

// DataSources
export { CompanyDataSource } from './_data-sources/company.datasource';
// Actions
// Question Actions =>
export {
    CompanyActionTypes,
    CompanyActions,
    QuestionOnServerCreated,
    QuestionCreated,
    QuestionUpdated,
   // QuestionsStatusUpdated,
    OneQuestionDeleted,
    ManyQuestionsDeleted,
    CompanysPageRequested,
    QuestionsPageLoaded,
    QuestionsPageCancelled,
    QuestionsPageToggleLoading
} from './_actions/company.actions';

// Effects
export { CompanyEffects } from './_effects/company.effects';

// Reducers
export { companyReducer } from './_reducers/company.reducers';
// Selectors
// Customer selectors =>
export {
    selectQuestionById,
    selectCompanyInStore,
    selectCompanyPageLoading,
    selectLastCreatedCompanyId,
    selectCompanyActionLoading,
    selectCompanyShowInitWaitingMessage
} from './_selectors/company.selectors';

    


// Services
export { CompanyService } from './_services';

