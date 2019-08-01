import { BaseModel } from '../../_base/crud';

export class CategoryModel  extends BaseModel { 

	id: number;
	categoryName: string; 
	area: string;
	clear() { 
		this.categoryName = ''; 
		this.area = '';
	}
}
