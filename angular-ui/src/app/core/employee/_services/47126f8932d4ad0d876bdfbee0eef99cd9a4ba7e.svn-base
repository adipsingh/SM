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

const API_CONSTRUCTION_CATEGORY_URL = `${environment.baseUrl}equipmentcatagory`;
@Injectable()
export class MethodService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createCategory(data) {
		const httpHeader = this.httpUtils.getHTTPHeaders(); 
		return this.http.post(API_CONSTRUCTION_CATEGORY_URL + '/Add', data, { headers: httpHeader });

		// const httpOptions = {
		// 	headers: new HttpHeaders({
		// 		'Content-Type': 'application/json'
		// 	})
		// };
		// return this.http.post(API_CONSTRUCTION_CATEGORY_URL + '/Add', category, httpOptions);
	}

	getAllMethod(): Observable<CategoryModel[]> {
		return this.http.get<CategoryModel[]>(API_CONSTRUCTION_CATEGORY_URL + '/All');
	}

	getCategoryById(categoryId: number): Observable<CategoryModel> {
		return this.http.get<CategoryModel>(API_CONSTRUCTION_CATEGORY_URL + `/${categoryId}`);
	}

	findMethod(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API_CONSTRUCTION_CATEGORY_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params: httpParams
		});
	}

	updateCategory(Category) {
		const httpHeader = this.httpUtils.getHTTPHeaders(); 
		return this.http.post(API_CONSTRUCTION_CATEGORY_URL + '/update/' + Category.ID, Category, { headers: httpHeader });
	}


	deleteCategory(categoryId: number) {
		const url = `${API_CONSTRUCTION_CATEGORY_URL + '/delete'}/${categoryId}`;
		return this.http.post(url, {});
	}

}
