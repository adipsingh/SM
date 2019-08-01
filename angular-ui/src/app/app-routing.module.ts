// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path: 'auth', loadChildren: 'app/views/pages/auth/auth.module#AuthModule'},

	// enable this router to set which demo theme to load,
	{path: 'admin', loadChildren: 'app/views/themes/admin/theme.module#ThemeModule'},
	{path: 'ptw', loadChildren: 'app/views/themes/ptw/theme.module#ThemeModule'},
	{path: 'demo1', loadChildren: 'app/views/themes/demo1/theme.module#ThemeModule'},	
	

	{path: '**', redirectTo: 'admin/pcwbsdefination', pathMatch: 'full'},
	//{path: '*/', redirectTo: 'ptw/detail-dashboard', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
