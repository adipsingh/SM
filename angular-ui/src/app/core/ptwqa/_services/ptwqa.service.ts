// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { PTWQAModel } from '../_models/ptwqa.model';
import { environment } from '../../../../environments/environment';

// const API_QUESTIONS_URL = 'api/ptwquestion/All';
const API_QUESTIONS_URL = `${environment.baseUrl}ptwquestion`;

@Injectable()
export class PTWQAService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new Question to the server
	createQuestion(question: PTWQAModel): Observable<PTWQAModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<PTWQAModel>(API_QUESTIONS_URL, question, { headers: httpHeaders});
	}

	// READ
	getAllQuestions(queryParams: QueryParamsModel): Observable<QueryResultsModel>  {
		//return this.http.get<PTWQAModel[]>(API_QUESTIONS_URL);
		let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');       
        let allQuestion = this.http.post<QueryResultsModel>(API_QUESTIONS_URL, queryParams, { headers: headers });
  		return allQuestion;
	}

	getQuestionById(questionId: number): Observable<PTWQAModel> {
		return this.http.get<PTWQAModel>(API_QUESTIONS_URL + `/${questionId}`);
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
	updateQuestion(question: PTWQAModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_QUESTIONS_URL, question, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForQuestion(questions: PTWQAModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			QuestionsForUpdate: questions,
			newStatus: status
		};
		const url = API_QUESTIONS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the Question from the server
	deleteQuestion(questionId: number): Observable<PTWQAModel> {
		const url = `${API_QUESTIONS_URL}/${questionId}`;
		return this.http.delete<PTWQAModel>(url);
	}

	deleteQuestions(ids: number[] = []): Observable<any> {
		const url = API_QUESTIONS_URL + '/deleteQuestions';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { QuestionIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
