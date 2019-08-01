// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { CategoryModel } from '../_models/method.model';
import { environment } from '../../../../../src/environments/environment';
// Models 
// const API_GET_ALL_METHOD_URL = `${environment.baseUrl}equipmentcatagory`;
const API_GET_ALL_METHOD_URL = `${environment.baseUrl}methodStatement`;

const API_GET_ALL_NAMES_URL = `${environment.baseUrl}fwbs`
@Injectable()
export class MethodService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createMethod(data) {
		const httpHeader = this.httpUtils.getHTTPHeaders(); 
		return this.http.post(API_GET_ALL_METHOD_URL + '/add', data, { headers: httpHeader });

		// const httpOptions = {
		// 	headers: new HttpHeaders({
		// 		'Content-Type': 'application/json'
		// 	})
		// };
		// return this.http.post(API_CONSTRUCTION_CATEGORY_URL + '/Add', category, httpOptions);
	}

	// getAllMethod(): Observable<CategoryModel[]> {
	// 	debugger;
	// 	return this.http.get<CategoryModel[]>(API_GET_ALL_METHOD_URL + '/all');
	// }

	getAllMethod(): Observable<QueryResultsModel> {
		debugger;
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		// const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API_GET_ALL_METHOD_URL + '/all';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders
			
		});
	}

	getAllFwbsName(): Observable<CategoryModel[]> {
		//debugger;
		return this.http.get<CategoryModel[]>(API_GET_ALL_NAMES_URL + '/allFwbsName');
	}

	getCategoryById(categoryId: number): Observable<CategoryModel> {
		return this.http.get<CategoryModel>(API_GET_ALL_METHOD_URL + `/${categoryId}`);
	}

	findMethod(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		debugger;
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API_GET_ALL_METHOD_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params: httpParams
		});
	}

	updateMethod(Category) {
		const httpHeader = this.httpUtils.getHTTPHeaders(); 
		return this.http.post(API_GET_ALL_METHOD_URL + '/update' + Category.ID, Category, { headers: httpHeader });
	}


	deleteMethod(categoryId: number) {
		const url = `${API_GET_ALL_METHOD_URL + '/delete'}/${categoryId}`;
		return this.http.post(url, {});
	}

}
