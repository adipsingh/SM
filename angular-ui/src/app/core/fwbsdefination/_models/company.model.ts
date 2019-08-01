import { BaseModel } from '../../_base/crud';

export class CompanyModel  extends BaseModel {
	id: number;
	name: string;
	category: string;
	code: string;
	

	clear() {
	 this.id = undefined;
		this.name = '';
		this.category ='';
		this.code = '';
	}
}
