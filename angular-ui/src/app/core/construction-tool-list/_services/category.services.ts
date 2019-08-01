// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../../src/environments/environment';
// Models 

const API_CONSTRUCTION_CATEGORY_URL = `${environment.baseUrl}equipmentcatagory`;
@Injectable()
export class Categoryervice {
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

	getAllCategory() {
		return this.http.get(API_CONSTRUCTION_CATEGORY_URL + '/All');
	}

	getImageByCategoryId(Id) {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.get(API_CONSTRUCTION_CATEGORY_URL + '/allImage/' + Id, {
			headers: httpHeader 
		});
	}

	getCategoryById(categoryId: number) {
		return this.http.get(API_CONSTRUCTION_CATEGORY_URL + `/${categoryId}`);
	}

	findCategory(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
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

	updateCategoryImage(obj) {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.post(API_CONSTRUCTION_CATEGORY_URL + '/addMedia', obj, { headers: httpHeader });
	}


	deleteCategory(categoryId: number) {
		const url = `${API_CONSTRUCTION_CATEGORY_URL + '/delete'}/${categoryId}`;
		return this.http.post(url, {});
	}

}
