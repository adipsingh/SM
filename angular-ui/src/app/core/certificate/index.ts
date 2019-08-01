// Context
export { CertificateQADataContext } from './_server/_certificate_qa.data-context';

// Models and Consts
export { QuestionModel } from './_models/question.model';
export { SPECIFICATIONS_DICTIONARY } from './_consts/specification.dictionary';

// DataSources
export { QuestionsDataSource } from './_data-sources/questions.datasource';
// Actions
// Question Actions =>
export {
    QuestionActionTypes,
    QuestionActions,
    QuestionOnServerCreated,
    QuestionCreated,
    QuestionUpdated,
   // QuestionsStatusUpdated,
    OneQuestionDeleted,
    ManyQuestionsDeleted,
    QuestionsPageRequested,
    QuestionsPageLoaded,
    QuestionsPageCancelled,
    QuestionsPageToggleLoading
} from './_actions/question.actions';

// Effects
export { QuestionEffects } from './_effects/question.effects';

// Reducers
export { questionsReducer } from './_reducers/question.reducers';
// Selectors
// Customer selectors =>
export {
    selectQuestionById,
    selectQuestionsInStore,
    selectQuestionsPageLoading,
    selectLastCreatedQuestionId,
    selectQuestionsActionLoading,
    selectQuestionsShowInitWaitingMessage
} from './_selectors/question.selectors';

    


// Services
export { QuestionsService } from './_services/';

