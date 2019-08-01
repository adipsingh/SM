import { BaseModel } from '../../_base/crud';
import { ProductSpecificationModel } from './product-specification.model';
import { ProductRemarkModel } from './product-remark.model';

export class ProductModel extends BaseModel {
	id: number;
	name: string;
	
	clear() {
		this.name = '';
		
	}
}
