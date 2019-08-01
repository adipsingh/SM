import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from "@angular/material";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";

import { AppState } from "../../../../../src/app/core/reducers";
import { LayoutUtilsService, MessageType } from "../../../../../src/app/core/_base/crud";
import { QuestionsAnswerModel } from "../../../core/questions-answer/_models/questions-answer.model";
import { QuestionsAnswerService } from "../../../core/questions-answer/_services/questions-answer.services";
//import { QuestionsAnswerDialogComponent } from "./questions-answer-dialog/questions-answer-dialog.component";


@Component({
  selector: 'kt-preapplication-qa',
  templateUrl: './preapplication-qa.component.html',
  styleUrls: ['./preapplication-qa.component.scss']
})
export class PreapplicationQaComponent implements OnInit {
	
	ngOnInit(): void {
		//this.loadQAList();
	//	this.loadCertificate();
	}

}