// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';

//import { CertificateQAModule } from './certificate-qa/certificate-qa.module';
import { ECommerceModule } from './certificate-qa/certificate-qa.module';
import { QuestionsService } from '../../../../src/app/core/certificate/_services/questions.service';
import { PreapplicationQaComponent } from './preapplication-qa/preapplication-qa.component';
//import { Preapplication1QaComponent } from './preapplication1-qa/preapplication1-qa.component';


@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		ECommerceModule
	],
	providers: [QuestionsService]
})
export class PagesModule {
}
