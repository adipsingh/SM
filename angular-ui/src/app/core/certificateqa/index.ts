// Context
export { ECommerceDataContext } from './_server/_e-commerce.data-context';

// Models and Consts
export { CustomerModel } from './_models/certificateqa.model';



export { SPECIFICATIONS_DICTIONARY } from './_consts/specification.dictionary';

// DataSources
export { CustomersDataSource } from './_data-sources/customers.datasource';




// Actions
// Customer Actions =>
export {
    CustomerActionTypes,
    CustomerActions,
    CustomerOnServerCreated,
    CustomerCreated,
    CustomerUpdated,
    CustomersStatusUpdated,
    OneCustomerDeleted,
    ManyCustomersDeleted,
    CustomersPageRequested,
    CertificatePageRequested,
    CustomersPageLoaded,
    CustomersPageCancelled,
    CustomersPageToggleLoading
} from './_actions/customer.actions';



// Effects
export { CustomerEffects } from './_effects/customer.effects';


// Reducers
export { customersReducer } from './_reducers/customer.reducers';


// Selectors
// Customer selectors =>
export {
    selectCustomerById,
    selectCustomersInStore,
    selectCustomersPageLoading,
    selectLastCreatedCustomerId,
    selectCustomersActionLoading,
    selectCustomersShowInitWaitingMessage
} from './_selectors/customer.selectors';


// Services
export { CustomersService } from './_services/';

