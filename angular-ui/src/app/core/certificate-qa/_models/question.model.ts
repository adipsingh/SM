import { BaseModel } from '../../_base/crud';

export class QuestionModel  extends BaseModel {
	id: number;
	question: string;
	excavation: string;
	confinedSpace: string;
	radioGraphy: string;
	energization: string;
	electrical: string; 
	criticalLift: string;
	gratingRemoval: string;
	
	

	clear() {
		this.question = '';
		this.excavation = '';
		this.confinedSpace = '';
		this.radioGraphy = '';
		this.energization = '';
		this.electrical = '';
		this.criticalLift = '';
		this.gratingRemoval = '';		
	}
}
