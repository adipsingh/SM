export class BaseModel {
	// Edit
	_isEditMode: boolean = false;
	// Log
	_userId: number = 0; // Admin
	_createdDate: string;
	_updatedDate: string;
	
		id: number;        
        createdBy: string;
        createdOn: string;
        modifiedBy: string;
        modifiedOn: string;
        
}
