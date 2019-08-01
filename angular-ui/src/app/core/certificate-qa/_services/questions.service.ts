// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { QuestionModel } from '../_models/question.model';

const API_QUESTIONS_URL = 'api/question';

@Injectable()
export class QuestionsService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new Question to the server
	createQuestion(question: QuestionModel): Observable<QuestionModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<QuestionModel>(API_QUESTIONS_URL, question, { headers: httpHeaders});
	}

	// READ
	getAllQuestions(): Observable<QuestionModel[]> {
		return this.http.get<QuestionModel[]>(API_QUESTIONS_URL);
	}

	getQuestionById(questionId: number): Observable<QuestionModel> {
		return this.http.get<QuestionModel>(API_QUESTIONS_URL + `/${questionId}`);
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
	updateQuestion(question: QuestionModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_QUESTIONS_URL, question, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForQuestion(questions: QuestionModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			QuestionsForUpdate: questions,
			newStatus: status
		};
		const url = API_QUESTIONS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the Question from the server
	deleteQuestion(questionId: number): Observable<QuestionModel> {
		const url = `${API_QUESTIONS_URL}/${questionId}`;
		return this.http.delete<QuestionModel>(url);
	}

	deleteQuestions(ids: number[] = []): Observable<any> {
		const url = API_QUESTIONS_URL + '/deleteQuestions';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { QuestionIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
