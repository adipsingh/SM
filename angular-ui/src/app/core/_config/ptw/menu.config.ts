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
					title: 'Detail Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'detail-dashboard',
					//translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Permit Conflict Simops',
					root: true,
					icon: 'flaticon2-expand',
					page: 'permit-conflict-simops'
				},
				{
					title: 'Permit To Work',
					root: true,
					icon: 'flaticon2-expand',
					page: 'permit-to-work'
				},
				/*{
					title: 'Admin',
					root: true,
					icon: 'flaticon2-expand',
					page: 
				},				
								{
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
