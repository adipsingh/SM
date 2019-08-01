// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable, of } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { CategoryModel } from '../_models/category.model';
import { environment } from '../../../../../src/environments/environment';
import { mergeMap } from 'rxjs/operators';
// Models 

// const API_CONSTRUCTION_CATEGORY_URL = `${environment.baseUrl}equipmentcatagory`;
const API_AREA_URL = 'api/area';

@Injectable()
export class Categoryervice {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createCategory(data) {
		const httpHeader = this.httpUtils.getHTTPHeaders(); 
		return this.http.post(API_AREA_URL, data, { headers: httpHeader });

		// const httpOptions = {
		// 	headers: new HttpHeaders({
		// 		'Content-Type': 'application/json'
		// 	})
		// };
		// return this.http.post(API_CONSTRUCTION_CATEGORY_URL + '/Add', category, httpOptions);
	}

	getAllCategory(): Observable<CategoryModel[]> {
		return this.http.get<CategoryModel[]>(API_AREA_URL);
	}

	getAllArea(): Observable<CategoryModel[]> {
		debugger;
		return this.http.get<CategoryModel[]>(API_AREA_URL);
	}

	getCategoryById(categoryId: number): Observable<CategoryModel> {
		return this.http.get<CategoryModel>(API_AREA_URL + `/${categoryId}`);
	}
	
	findCategory(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		debugger;
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API_AREA_URL;
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params: httpParams
		});
	}


	updateCategory(Category) {
		const httpHeader = this.httpUtils.getHTTPHeaders(); 
		return this.http.post(API_AREA_URL + Category.ID, Category, { headers: httpHeader });
	}


	// deleteCategory(categoryId: number) {
	// 	const url = `${API_AREA_URL + '/delete'}/${categoryId}`;
	// 	return this.http.post(url, {});
	// }

	deleteCategory(categoryId: number) {
		const url = `${API_AREA_URL}/${categoryId}`;
		return this.http.delete(url);
    }

}
