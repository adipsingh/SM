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
				path: 'dashboard',
				loadChildren: 'app/views/pages/dashboard/dashboard.module#DashboardModule'
			},
			/*{
				path: 'permit-to-work',
				loadChildren: 'app/views/pages/permit-to-work/permit-to-work.module#PermitToWorkModule'
			},
			{
				path: 'permit-conflict-simops',
				loadChildren: 'app/views/pages/permit-conflict-simops/permit-conflict-simops.module#PermitConflictSimopsModule'
			},
			{
				path: 'admin',
				loadChildren: 'app/views/themes/demo1/theme.module#ThemeModule'
			},
			{
				path: 'builder',
				loadChildren: 'app/views/themes/demo1/content/builder/builder.module#BuilderModule'
			},*/

			
			{path:'admin',redirectTo:'admin/'},
			{path: 'error/:type', component: ErrorPageComponent},
			//{path: 'admin', redirectTo: '/admin'},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
