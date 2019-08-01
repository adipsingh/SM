import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from "@angular/material";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { AppState } from "../../../../../src/app/core/reducers";
import { LayoutUtilsService, MessageType } from "../../../../../src/app/core/_base/crud";
import { QuestionsAnswerModel } from "../../../core/questions-answer/_models/questions-answer.model";
import { QuestionsAnswerService } from "../../../core/questions-answer/_services/questions-answer.services";
import { QuestionsAnswerDialogComponent } from "./questions-answer-dialog/questions-answer-dialog.component";



@Component({
	selector: 'kt-ptwpre-application-qa',
	templateUrl: './ptwpre-application-qa.component.html',
	styleUrls: ['ptwpre-application-qa.component.scss'],
})

export class PTWPreApplicationQAComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource;
	displayedColumns = ['id', 'questionTitle'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<QuestionsAnswerModel>(true, []);
	qasResult = [];
	certificateArray: any;

	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private QAService: QuestionsAnswerService,
		private store: Store<AppState>
	) { }


	ngOnDestroy(): void {

	}

	ngOnInit(): void {
		this.loadQAList();
		this.loadCertificate();
	}

	// ----------------------- 


	/**
	 * Show add QA dialog
	 */
	addQA() {
		const newQA = new QuestionsAnswerModel();
		newQA.clear(); // Set all defaults fields
		this.editQA(newQA);
	}

	/**
	 * Show Edit qa dialog and save after success close result
	 * @param qa: QuestionsAnswerModel
	 */
	editQA(qa) {
		let saveMessageTranslateParam = qa.id > 0 ? 'QA Update successfully' : 'QA added successfully';
		let _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = qa.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(QuestionsAnswerDialogComponent, { data: { qa } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				// let saveMessageTranslateParam = res ? res : '';
				// _saveMessage = this.translate.instant(saveMessageTranslateParam);
			} else {
				this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
				this.loadQAList();
			}
		});
	}
	// ---------------


	addCertificate() {

	}

	// -----------------

	loadCertificate() {
		this.QAService
			.getAllCertificate()
			.subscribe((res: any) => {
				console.log("res subscribe", res);
				this.certificateArray = res['result'];
				this.certificateArray.forEach((element, i) => {
					this.displayedColumns.push(element.name);

					if ((i + 1) == (this.certificateArray).length) {
						this.displayedColumns.push('actions');
					}
				});


			});
	}

	chkCertificate(dc, element) {
		let flage = 'No';
		if (element['certificates'] != []) {

			element['certificates'].forEach((emt: any, i) => {
				if (emt.name == dc) {
					flage = 'Yes';
				}
				if ((element['certificates']).length == (i + 1)) {
					return flage
				}
			});
		} else {
			return 'No'
		}
	}

	/**
	 * Load QAs List from service through data-source
	 */
	loadQAList() {
		// console.log("loadQA");  
		this.dataSource = new MatTableDataSource([]);
		this.QAService
			.getAllQA()
			.subscribe((res) => {
				this.dataSource.data = [];
				const dataArray = res['result'];
				dataArray.forEach((emt: any, i) => {
					if ((emt['certificates']).length > 0) {
						emt['certificates'].forEach(cer => {
							dataArray[i][cer.name] = true;
						});
					}
				});
				this.dataSource.data = dataArray;
				this.dataSource.paginator = this.paginator;
			});
	}

	/**
	 * Delete qa
	 *
	 * @param _item: QuestionsAnswerModel
	 */
	deleteQA(_item) {
		const _title: string = 'QA Delete'
		const _description: string = 'Are you sure to permanently delete this qa?';
		const _waitDesciption: string = 'QA is deleting...';
		const _deleteMessage = 'QA has been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.QAService
				.deleteQA(_item.id)
				.subscribe((res) => {
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);

					setTimeout(() => {
						this.loadQAList();
					}, 2000);

					let index;
					this.dataSource.data.findIndex((emt, i) => {
						if (emt.id == _item.id) {
							index = i;
						}
					});

					this.dataSource.data.splice(index, 1);
					const dataArray = this.dataSource.data
					this.dataSource.data = dataArray;
				}, ((error) => {
					// console.log("error", error);
					if (error['error']['text'] == "Record Deleted Successfully..") {
						this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);

						setTimeout(() => {
							this.loadQAList();
						}, 2000);

						let index;
						this.dataSource.data.findIndex((emt, i) => {
							if (emt.id == _item.id) {
								index = i;
							}
						});

						this.dataSource.data.splice(index, 1);
						const dataArray = this.dataSource.data
						this.dataSource.data = dataArray;
					}
				})
				);
		});
	}




}