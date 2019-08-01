// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
// Lodash
import { each } from 'lodash';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { CompanyModel } from '../_models/company.model';

const API_COMPANY_URL = 'api/companys';

// Fake REST API (Mock)
// This code emulates server calls
@Injectable()
export class CompanyService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createCompany(company: CompanyModel): Observable<CompanyModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<CompanyModel>(API_COMPANY_URL, company, { headers: httpHeaders});
	}

	// READ
	getAllCompanys(): Observable<CompanyModel[]> {
		return this.http.get<CompanyModel[]>(API_COMPANY_URL);
	}

	getCompanyById(companyId: number): Observable<CompanyModel> {
		return this.http.get<CompanyModel>(API_COMPANY_URL + `/${companyId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findCompanys(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_COMPANY_URL;
		return this.http.get<CompanyModel[]>(API_COMPANY_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}


	// UPDATE => PUT: update the customer on the server
	updateCompany(company: CompanyModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_COMPANY_URL, company, { headers: httpHeader });
	}

	// // UPDATE Status
	// updateStatusForCustomer(customers: CompanyModel[], status: number): Observable<any> {
	// 	const tasks$ = [];
	// 	each(customers, element => {
	// 		const _customer = Object.assign({}, element);
	// 		_customer.status = status;
	// 		tasks$.push(this.updateCustomer(_customer));
	// 	});
	// 	return forkJoin(tasks$);
	// }

	// DELETE => delete the customer from the server
	deleteCompany(companyId: number): Observable<any> {
		const url = `${API_COMPANY_URL}/${companyId}`;
		return this.http.delete<CompanyModel>(url);
	}

	deleteCompanys(ids: number[] = []): Observable<any> {
		const tasks$ = [];
		const length = ids.length;
		// tslint:disable-next-line:prefer-const
		for (let i = 0; i < length; i++) {
			tasks$.push(this.deleteCompany(ids[i]));
		}
		return forkJoin(tasks$);
	}
}
