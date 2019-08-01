import { BaseModel } from '../../_base/crud';


export class CustomerModel  extends BaseModel {
	// id: number;
	// firstName: string;
	// lastName: string;
	// email: string;
	// userName: string;
	// gender: string;
	// status: number; // 0 = Active | 1 = Suspended | Pending = 2
	// dateOfBbirth: string;
	// dob: Date;
	// ipAddress: string;
	// type: number; // 0 = Business | 1 = Individual
	id: number;
	question: string;
	excavation: boolean;
	confinedSpace: boolean;
	radioGraphy: boolean;
	energization: boolean;
	electrical: boolean; 
	criticalLift: boolean;
	gratingRemoval: boolean;
	certificatename:CustomerModel[];
	isSelected:  boolean;
	parentId: number;

	clear() {
		
		this.question = '';
		this.excavation = false;
		this.confinedSpace = false;
		this.radioGraphy = false;
		this.energization = false;
		this.electrical = false;
		this.criticalLift = false;
		this.gratingRemoval =false;
		this.certificatename = [];
		this.isSelected = false;
		this.parentId = undefined;
	}
}
