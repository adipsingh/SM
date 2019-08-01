import { CompanyTable } from './customers.table';
import { SectionTable } from './cars.table';
import { RemarksTable } from './remarks.table';
import { CarSpecificationsTable } from './car-specifications.table';
import { OrdersTable } from './orders.table';

// Wrapper class
export class CompanyDataContext {
	public static companies: any = CompanyTable.company;

	public static sections: any = SectionTable.section;

	// e-commerce car remarks
	// one => many relations
	public static remarks = RemarksTable.remarks;

	// e-commerce car specifications
	// one => many relations
	public static carSpecs = CarSpecificationsTable.carSpecifications;


	public static orders = OrdersTable.orders;
}
