import { BaseModel } from '../../_base/crud';

export class CertificateQAModel  extends BaseModel {
	id: number;
	name: string;
	catagory: string;
	code: string;
	

	clear() {
		
		this.name = '';		
		this.catagory = '';
		this.code = '';
		
	}
}
