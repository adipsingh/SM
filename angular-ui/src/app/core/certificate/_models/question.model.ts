import { BaseModel } from '../../_base/crud';

export class QuestionModel  extends BaseModel {
	id: number;
	question: string;
	excavation: boolean;
	confinedSpace: boolean;
	radioGraphy: boolean;
	energization: boolean;
	electrical: boolean; 
	criticalLift: boolean;
	gratingRemoval: boolean;
	
	

	clear() {
		this.question = '';
		// this.excavation.valueOf();
		// this.confinedSpace.valueOf();
		// this.radioGraphy.valueOf();
		// this.energization.valueOf();
		// this.electrical.valueOf();
		// this.criticalLift.valueOf();
		// this.gratingRemoval.valueOf();	
	}
}
