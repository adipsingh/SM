// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';



const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'detail-dashboard',
				loadChildren: 'app/views/pages/detail-dashboard/detail-dashboard.module#DetailDashboardModule'
			},
			{
				path: 'permit-conflict-simops',
				loadChildren: 'app/views/pages/permit-conflict-simops/permit-conflict-simops.module#PermitConflictSimopsModule'
			},
			{
				path: 'permit-to-work',
				loadChildren: 'app/views/pages/permit-to-work/permit-to-work.module#PermitTOWorkModule'
			},
			/*{
				path:'/admin/pcwbsdefination',
				loadChildren: 'app/views/themes/admin/theme.module#ThemeModule'
				
			},*/
			
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			
			{path: '', redirectTo: 'detail-dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'detail-dashboard', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
