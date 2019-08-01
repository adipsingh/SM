// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { CompanyModel } from '../_models/company.model';
import { FWBSDefinationModel } from '../_models/FWBSDefination.models';
import { FWBSMediaModel } from '../_models/FWBSMedia.models';
import { environment } from '../../../../../src/environments/environment';

const API_FWBS_URL = 'fwbs';    

@Injectable()
export class FWBSDefinationService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// // CREATE =>  POST: add a new Question to the server
	// createQuestion(question: CompanyModel): Observable<CompanyModel> {
	// 	// Note: Add headers if needed (tokens/bearer)
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	return this.http.post<CompanyModel>(API_FWBS_URL, question, { headers: httpHeaders});
	// }

	// READ
	getAllDefinations(): Observable<FWBSDefinationModel[]> {
		return this.http.get<FWBSDefinationModel[]>(environment.baseUrl + API_FWBS_URL + `/All`);
	}

    addMedia(media:FWBSMediaModel): Observable<any> {
        	const url = environment.baseUrl + API_FWBS_URL +  '/AddMedia';
        	const httpHeaders = this.httpUtils.getHTTPHeaders();
        	const body = media;
        	return this.http.post<QueryResultsModel>(url, body, { headers: httpHeaders} );
        }

	// getQuestionById(questionId: number): Observable<CompanyModel> {
	// 	return this.http.get<CompanyModel>(API_QUESTIONS_URL + `/${questionId}`);
	// }

	// // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// // items => filtered/sorted result
	// // Server should return filtered/sorted result
	// findQuestions(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 	// Note: Add headers if needed (tokens/bearer)
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

	// 	const url = API_QUESTIONS_URL + '/find';
	// 	return this.http.get<QueryResultsModel>(url, {
	// 		headers: httpHeaders,
	// 		params:  httpParams
	// 	});
	// }

	// // UPDATE => PUT: update the Question on the server
	// updateQuestion(question: CompanyModel): Observable<any> {
	// 	const httpHeader = this.httpUtils.getHTTPHeaders();
	// 	return this.http.put(API_QUESTIONS_URL, question, { headers: httpHeader });
	// }

	// // UPDATE Status
	// updateStatusForQuestion(questions: CompanyModel[], status: number): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const body = {
	// 		QuestionsForUpdate: questions,
	// 		newStatus: status
	// 	};
	// 	const url = API_QUESTIONS_URL + '/updateStatus';
	// 	return this.http.put(url, body, { headers: httpHeaders });
	// }

	// // DELETE => delete the Question from the server
	// deleteQuestion(questionId: number): Observable<CompanyModel> {
	// 	const url = `${API_QUESTIONS_URL}/${questionId}`;
	// 	return this.http.delete<CompanyModel>(url);
	// }

	// deleteQuestions(ids: number[] = []): Observable<any> {
	// 	const url = API_QUESTIONS_URL + '/deleteQuestions';
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const body = { QuestionIdsForDelete: ids };
	// 	return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	// }
}
