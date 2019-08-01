import { BaseModel } from '../../_base/crud';

export class PrecautionQAModel  extends BaseModel {

	
	precautionTypeID : number;
	question: string;
	precautionType:string;
	

	clear() {
		
		this.question = '';		
	}
}
