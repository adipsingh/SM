// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { PrecautionQAModel } from '../_models/precaution.model';

const API_CUSTOMERS_URL = 'api/customers';

@Injectable()
export class CustomersService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createCustomer(customer: PrecautionQAModel): Observable<PrecautionQAModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<PrecautionQAModel>(API_CUSTOMERS_URL, customer, { headers: httpHeaders});
	}

	// READ
	getAllCustomers(): Observable<PrecautionQAModel[]> {
		return this.http.get<PrecautionQAModel[]>(API_CUSTOMERS_URL);
	}

	getCustomerById(customerId: number): Observable<PrecautionQAModel> {
		return this.http.get<PrecautionQAModel>(API_CUSTOMERS_URL + `/${customerId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findCustomers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = API_CUSTOMERS_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the customer on the server
	updateCustomer(customer: PrecautionQAModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_CUSTOMERS_URL, customer, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForCustomer(customers: PrecautionQAModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			customersForUpdate: customers,
			newStatus: status
		};
		const url = API_CUSTOMERS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the customer from the server
	deleteCustomer(customerId: number): Observable<PrecautionQAModel> {
		const url = `${API_CUSTOMERS_URL}/${customerId}`;
		return this.http.delete<PrecautionQAModel>(url);
	}

	deleteCustomers(ids: number[] = []): Observable<any> {
		const url = API_CUSTOMERS_URL + '/deleteCustomers';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { customerIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
