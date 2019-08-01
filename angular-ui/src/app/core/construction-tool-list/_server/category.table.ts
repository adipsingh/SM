export class CertificateQATable {
	public static QA: any = [
		{
			id: 1,
			question: 'Does Your Work Requires Excavation Deepar than 300mm, but less than 1200mm ?',
			excavation: true,
			confinedSpace: true,
			radioGraphy: false,
			energization: false,
			electrical: false,
			criticalLift: false,
			gratingRemoval: false	
			//status: 0,
		},
		{
			id: 2,
			question: 'Does Your Work Requires Excavation Deepar than 1200mm?',
			excavation: true,
			confinedSpace: true,
			radioGraphy: false,
			energization: false,
			electrical: false,
			criticalLift: false,
			gratingRemoval: false	
		},
		{
			id: 3,
			question: 'Does Your Work Requires Entry into a space that is not designed human occupancy and has restricted access/egress?',
			excavation: false,
			confinedSpace: false,
			radioGraphy: true,
			energization: false,
			electrical: false,
			criticalLift: false,
			gratingRemoval: false	
		},
		{
			id: 4,
			question: 'Does Your Work Requires using readiography equiment(eg. soil density testing, NDT etc.)?',
			excavation: false,
			confinedSpace: false,
			radioGraphy: false,
			energization: true,
			electrical: false,
			criticalLift: false,
			gratingRemoval: false	
		},
		{
			id: 5,
			question: 'Does Your Work Requires Energization or de-Energization of equipment, system or sub-system ?',
			excavation: false,
			confinedSpace: false,
			radioGraphy: false,
			energization: false,
			electrical: true,
			criticalLift: false,
			gratingRemoval: false	
		},
		{
			id: 6,
			question: 'Does Your Work Requires Work on electrical equipment, instruments, system or sub-system ?',
			excavation: false,
			confinedSpace: false,
			radioGraphy: false,
			energization: false,
			electrical: false,
			criticalLift: true,
			gratingRemoval: false	
		},
		{
			id: 7,
			question: 'Does Your Work Requires Lifting of Loads more than 40 t over or near live lines during night by tendom lift?',
			excavation: false,
			confinedSpace: false,
			radioGraphy: false,
			energization: false,
			electrical: false,
			criticalLift: true,
			gratingRemoval: true	
		},
		{
			id: 8,
			question: 'Does Your Work Requires Removing of gratings or Opening of floor deckings?',
			excavation: false,
			confinedSpace: false,
			radioGraphy: false,
			energization: false,
			electrical: false,
			criticalLift: false,
			gratingRemoval: true
		},
	];
}
