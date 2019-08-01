// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';
// Auth
import { AuthDataContext } from '../../../../auth';
import { FunctionDataContext } from '../../../../functions';
import { EmployeeDataContext } from '../../../../employee';

// ECommerce
import { ECommerceDataContext } from '../../../../certificateqa';
import{CompanyDataContext}from '../../../../e-commerce'
// Models
import { CarsDb } from './fake-db/cars';
import{CertificateQADataContext}from '../../../../certificate-qa'
import{CompanyDetailsContext}from '../../../../company';
import{areaDataContext} from '../../../../pcwbs-def-area';
import{methodDataContext} from '../../../../method-statement';

@Injectable()
export class  FakeApiService implements InMemoryDbService {
	/**
	 * Service Constructore
	 */
	constructor() {}

	/**
	 * Create Fake DB and API
	 */
	createDb(): {} | Observable<{}> {
		// tslint:disable-next-line:class-name
		const db = {
			// auth module
			users: AuthDataContext.users,
			roles: AuthDataContext.roles,
			permissions: AuthDataContext.permissions,
			function:FunctionDataContext.function,
			employes:EmployeeDataContext.employes,
			// e-commerce
			// customers
			certificateQuestions: ECommerceDataContext.questions,
			// products
			company:CompanyDataContext.companies,
			section: CompanyDataContext.sections,
			productRemarks: CompanyDataContext.remarks,
			productSpecs: CompanyDataContext.carSpecs,

			// orders
			orders: CompanyDataContext.orders,

			// campany-table
			companys:CompanyDetailsContext.companys,

			// area-table
			area:areaDataContext.area,

			// method-statement
			methods:methodDataContext.methods
		};
		return db;
	}
}
