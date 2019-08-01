export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pages',
					'root': true,
					'icon-': 'flaticon-add',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'alignment': 'left',
					// submenu: []
				},
				{
					'title': 'Features',
					'root': true,
					'icon-': 'flaticon-line-graph',
					'toggle': 'click',
					'alignment': 'left',
					// submenu: []
				},
				{
					'title': 'Apps',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'alignment': 'left',
					// submenu: []
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'PCWBS Defination ',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'pcwbsdefination',
					//translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'FWBS Defination',
					root: true,
					icon: 'flaticon2-expand',
					page: 'fwbsdefination'
				},
				{
					title: 'PTW Pre Application QA',
				//	bullet: 'dot',
					icon: 'flaticon2-expand',
					root: true,
					page: 'preapplication-qa'		
				},
				// {
				// 	title: 'Certificate QA',
				// 	bullet: 'dot',
				// 	root: true,
				// 	icon: 'flaticon2-expand',	
				// 	page: 'certificate-qa/question'				
				// 	//permission: 'accessToCerificateQAModule',					
				// },
				{
					title: 'Certificate Authority',
					root: true,
					icon: 'flaticon2-expand',
					page: 'certificate-authority'
				}, 
				{
					title: 'Certificate QA',
					root: true,
					icon: 'flaticon2-expand',
					page: 'ptwpre-application-qa'
				},
				
				{
					title: 'Working Hour',
					root: true,
					icon: 'flaticon-clock-1',
					page: 'working-hour'
				},
				{
					title: 'Construction Tool List',
					root: true,
					icon: 'flaticon2-expand',
					page: 'construction-tool-list'
				},
				{
					title: 'Method Statement',
					root: true,
					icon: 'flaticon2-expand',
					page: 'method-statement'
				},
				{
					title: 'Precaution QA',
					root: true,
					icon: 'flaticon2-expand',
					page: 'precaution-qa/edit'
				},
				{
					title: 'Affected Area And Discipline',
					root: true,
					icon: 'flaticon2-expand',
					page: 'afected-area-and-discipline'
				},
				// {section: 'Applications'},
				// {
				// 	title: 'eCommerce',
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-list-2',
				// 	root: true,
				// 	//permission: 'accessToECommerceModule',
				// 	submenu: [
				// 		{
				// 			title: 'Customers',
				// 			page: 'ecommerce/customers'
				// 		},
				// 		{
				// 			title: 'Products',
				// 			page: 'ecommerce/products'
				// 		},
				// 	]
				// },
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: 'user-management/users'
						},
						{
							title: 'Roles',
							page: 'user-management/roles'
						}
					]
				},

				{
					title: 'Company Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-buildings',
					submenu: [
						{
							title: 'Company',
							page: 'company-management/company'
						},
						{
							title: 'Section',
							page: 'company-management/section'
						},
						{
							title: 'Function',
							page: 'company-management/function'
						},
						{
							title: 'Employee',
							page: 'company-management/employee'
						}
					]
				},
				// {
				// 	title: 'Company Management',
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-list-2',
				// 	root: true,
				// 	permission: 'accessToECommerceModule',
				// 	submenu: [
				// 		{
				// 			title: 'Company',
				// 			page: 'company-management/company'
				// 		},
				// 		{
				// 			title: 'Section',
				// 			page: 'company-management/section'
				// 		},
				// 	]
				// },
				/*{
					title: 'Layout Builder',
					root: true,
					icon: 'flaticon2-expand',
					page: '/builder'
				},
				{section: 'Custom'},
				{
					title: 'Custom Link',
					root: true,
					icon: 'flaticon2-link',
					bullet: 'dot',
				},*/
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
