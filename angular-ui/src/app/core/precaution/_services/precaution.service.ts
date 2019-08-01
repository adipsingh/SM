// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { PrecautionQAModel } from '../_models/precaution.model';
import { environment } from '../../../../environments/environment.prod';

const API_PRECAUTIONQA_URL = 'precaution';

@Injectable()
export class PrecautionQAService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createPrecautionQA(customer: PrecautionQAModel): Observable<PrecautionQAModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<PrecautionQAModel>(API_PRECAUTIONQA_URL, customer, { headers: httpHeaders});
	}

	// READ
	getAllQuestions(): Observable<PrecautionQAModel[]> {
		return this.http.get<PrecautionQAModel[]>(environment.baseUrl+ API_PRECAUTIONQA_URL+`/All`);
		
	}
	getQuestionById(customerId: number): Observable<PrecautionQAModel> {
		return this.http.get<PrecautionQAModel>(environment.baseUrl+ API_PRECAUTIONQA_URL + `/${customerId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findQuestions(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url =API_PRECAUTIONQA_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the Question on the server
	updateQuestion(question: PrecautionQAModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		const url=environment.baseUrl+API_PRECAUTIONQA_URL +'/update/'+question.id;
		return this.http.post(url, {Question: question.question}, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForQuestion(customers: PrecautionQAModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			customersForUpdate: customers,
			newStatus: status
		};
		const url = API_PRECAUTIONQA_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the Question from the server
	deleteQuestion(customerId: number): Observable<PrecautionQAModel> {
		const url = environment.baseUrl+API_PRECAUTIONQA_URL+`/delete/${customerId}`;
		return this.http.post<PrecautionQAModel>(url,null);
	}

	deleteQuestions(ids: number[] = []): Observable<any> {
		const url = API_PRECAUTIONQA_URL + '/deleteCustomers';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { customerIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
