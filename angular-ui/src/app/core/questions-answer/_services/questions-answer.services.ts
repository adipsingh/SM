// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { QuestionsAnswerModel } from '../_models/questions-answer.model'
// Models 

const API_QUE_ANS_URL = 'http://114.143.25.202:8215/api/question';
// const API_CERTIFICATE_QUE_ANS_URL = 'http://114.143.25.202:8215/api/certificateqa';
const API_CERTIFICATE_URL = 'http://114.143.25.202:8215/api/certificate';

@Injectable()
export class QuestionsAnswerService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createQA(data) {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.post(API_QUE_ANS_URL + '/Add', data, { headers: httpHeader });
	}

	getAllQA() {
		return this.http.get(API_QUE_ANS_URL + '/All');
	}

	getAllCertificate() {
		return this.http.get(API_CERTIFICATE_URL + '/All');
	} 

	updateQA(QA) {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.post(API_QUE_ANS_URL + '/update/', QA, { headers: httpHeader });
	} 

	deleteQA(qaId: number) {
		const url = `${API_QUE_ANS_URL + '/delete'}/${qaId}`;
		return this.http.post(url, {});
	}

}
