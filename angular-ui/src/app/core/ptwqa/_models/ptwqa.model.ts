import { BaseModel } from '../../_base/crud';

export class PTWQAModel  extends BaseModel {
	id: number;
	questions: string;

	clear() {
		this.questions = '';
	}
}
