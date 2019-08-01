// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { CompanyModel } from '../_models/company.model';

const API_QUESTIONS_URL = 'api/companys';

@Injectable()
export class CompanyService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new Question to the server
	createQuestion(question: CompanyModel): Observable<CompanyModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<CompanyModel>(API_QUESTIONS_URL, question, { headers: httpHeaders});
	}

	// READ
	getAllCompanys(): Observable<CompanyModel[]> {
		return this.http.get<CompanyModel[]>(API_QUESTIONS_URL);
	}

	getQuestionById(questionId: number): Observable<CompanyModel> {
		return this.http.get<CompanyModel>(API_QUESTIONS_URL + `/${questionId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findQuestions(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = API_QUESTIONS_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the Question on the server
	updateQuestion(question: CompanyModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_QUESTIONS_URL, question, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForQuestion(questions: CompanyModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			QuestionsForUpdate: questions,
			newStatus: status
		};
		const url = API_QUESTIONS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the Question from the server
	deleteQuestion(questionId: number): Observable<CompanyModel> {
		const url = `${API_QUESTIONS_URL}/${questionId}`;
		return this.http.delete<CompanyModel>(url);
	}

	deleteQuestions(ids: number[] = []): Observable<any> {
		const url = API_QUESTIONS_URL + '/deleteQuestions';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { QuestionIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
