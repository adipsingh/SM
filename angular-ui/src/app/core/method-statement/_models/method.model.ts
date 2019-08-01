import { BaseModel } from '../../_base/crud';

export class CategoryModel  extends BaseModel { 

	id: number;
	categoryName: string;
	drawing:string;
	description:string;
	revision:string; 

	clear() { 
		this.categoryName = '';
		this.drawing = '' ;
		this.description ='';
		this.revision = ''; 
	}
}
