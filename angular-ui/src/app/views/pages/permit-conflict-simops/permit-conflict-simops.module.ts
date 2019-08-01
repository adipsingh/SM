import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { PermitConflictSimopsComponent } from './permit-conflict-simops.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		NgbModule,
		CoreModule,		
		RouterModule.forChild([
			{
				path: '',
				component: PermitConflictSimopsComponent
			}
		])
	],
	providers: [],
	declarations: [PermitConflictSimopsComponent]
})
export class PermitConflictSimopsModule {
}