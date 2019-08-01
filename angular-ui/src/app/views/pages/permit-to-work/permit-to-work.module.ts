// Angular

// CoreModule
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { PermitToWorkComponent } from './permit-to-work.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [PermitToWorkComponent],
	imports: [
	  CommonModule,
	  RouterModule.forChild([
			  {
				  path: '',
				  component: PermitToWorkComponent
			  },
		  ]),
	]
  })
  export class PermitTOWorkModule { }
  