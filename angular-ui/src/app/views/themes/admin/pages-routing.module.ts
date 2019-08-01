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
				path: 'pcwbsdefination',
				loadChildren: 'app/views/pages/pcwbsdefination/pcwbsdefination.module#PCWBSDefinationModule'
			},
			{
				path: 'fwbsdefination',
				loadChildren: 'app/views/pages/fwbsdefination/fwbsdefination.module#FWBSDefinationModule'
			},
			{
				path: 'ptwpre-application-qa',
				loadChildren: 'app/views/pages/ptwpre-application-qa/ptwpre-application-qa.module#PTWPreApplicationQAModule'
			},
			{
				path: 'preapplication-qa',
				loadChildren: 'app/views/pages/preapplication1-qa/preapplication1-qa.module#Preapplication1QAModule'
			},
			// {
			// 	path: 'certificate',
			// 	loadChildren: 'app/views/pages/certificate/certificate.module#CertificateQAModule'
			// },
			{
				path: 'certificate-authority',
				loadChildren: 'app/views/pages/certificate-authority/certificate-authority.module#CertificateAuthorityModule'
			},
			{
				path: 'working-hour',
				loadChildren: 'app/views/pages/working-hour/working-hour.module#WorkingHourModule'
			},
			{
				path: 'construction-tool-list',
				loadChildren: 'app/views/pages/construction-tool-list/construction-tool-list.module#ConstructionToolListModule'
			},
			{
				path: 'method-statement',
				loadChildren: 'app/views/pages/method-statement/method-statement.module#MethodStatementModule'
			},
			{
				path: 'precaution-qa',
				loadChildren: 'app/views/pages/precaution-qa/precaution-qa.module#PrecautionQAModule'
			},
			{
				path: 'afected-area-and-discipline',
				loadChildren: 'app/views/pages/afected-area-and-discipline/afected-area-and-discipline.module#AfectedAreaAndDisciplineModule'
			},
			{
				path: 'certificate-qa',
				loadChildren: 'app/views/pages/certificate-qa/certificate-qa.module#ECommerceModule'
				
			},
			{
				path: 'user-management',
				loadChildren: 'app/views/pages/user-management/user-management.module#UserManagementModule'
			},
			 {
			 	path: 'company-management',
				loadChildren: 'app/views/pages/company-management/company-management.module#CompanyManagementModule',
				// canActivate: [NgxPermissionsGuard],
				// data: {
			 	// 	permissions: {
			 	// 		only: ['accessToECommerceModule'],
			 	// 		redirectTo: 'error/403'
			 	// 	}
				// }
			},
			
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
			{path: '', redirectTo: 'pcwbsdefination', pathMatch: 'full'},
			{path: '**', redirectTo: 'pcwbsdefination', pathMatch: 'full'},
			//{path: '/question', redirectTo: 'question-list', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
