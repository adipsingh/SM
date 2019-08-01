import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailDashboardComponent } from './detail-dashboard.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DetailDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
			{
				path: '',
				component: DetailDashboardComponent
			},
		]),
    
  ]
})
export class DetailDashboardModule { }
