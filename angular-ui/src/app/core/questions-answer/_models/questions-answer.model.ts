import { BaseModel } from '../../_base/crud';

export class QuestionsAnswerModel  extends BaseModel { 

	id: number; 
	questionTitle: string; 

	clear() { 
		this.questionTitle = ''; 
	}
}
