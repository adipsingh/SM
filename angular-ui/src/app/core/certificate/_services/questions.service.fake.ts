// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, forkJoin, of, BehaviorSubject } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
// Lodash
import { each } from 'lodash';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { QuestionModel } from '../_models/question.model';

const API_QUESTIONS_URL = 'api/questions';

// Fake REST API (Mock)
// This code emulates server calls
@Injectable()
export class QuestionsService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new question to the server
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
	findQuestions(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls		
		return this.getAllQuestions().pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['question']);
				return of(result);
			})
		);
	}


	// UPDATE => PUT: update the customer on the server
	updateQuestion(question: QuestionModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_QUESTIONS_URL, question, { headers: httpHeader });
	}

	// UPDATE Status
	/*updateStatusForCustomer(questions: QuestionModel[], status: number): Observable<any> {
		const tasks$ = [];
		each(questions, element => {
			const _question = Object.assign({}, element);
			_question.status = status;
			tasks$.push(this.updateCustomer(_question));
		});
		return forkJoin(tasks$);
	}*/

	// DELETE => delete the Question from the server
	deleteQuestion(questionId: number): Observable<any> {
		const url = `${API_QUESTIONS_URL}/${questionId}`;
		return this.http.delete<QuestionModel>(url);
	}

	deleteQuestions(ids: number[] = []): Observable<any> {
		const tasks$ = [];
		const length = ids.length;
		// tslint:disable-next-line:prefer-const
		for (let i = 0; i < length; i++) {
			tasks$.push(this.deleteQuestion(ids[i]));
		}
		return forkJoin(tasks$);
	}
}
