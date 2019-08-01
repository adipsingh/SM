import { Component, OnInit, OnDestroy } from '@angular/core';
import { PTWQAModel, selectQuestionsActionLoading, selectQuestionById, QuestionUpdated, QuestionOnServerCreated, selectLastCreatedQuestionId } from '../../../../../../src/app/core/ptwqa';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService, LayoutConfigService } from '../../../../../../src/app/core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../../src/app/core/_base/crud';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../../src/app/core/reducers';
import { Update } from '@ngrx/entity';


@Component({
  selector: 'kt-edit',
  templateUrl: './edit.component.html',
  
})
export class EditComponent implements OnInit,OnDestroy {
  question: PTWQAModel;
	questionId$: Observable<number>;
	oldQuestion: PTWQAModel;	
	loading$: Observable<boolean>;	
	questionForm: FormGroup;
  hasFormErrors: boolean = false;
  selectedTab: number = 0;
	// Private properties
	private subscriptions: Subscription[] = [];
  constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private questionFB: FormBuilder,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private layoutConfigService: LayoutConfigService) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectQuestionsActionLoading));

		const queSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params['id'];
			if (id && id > 0) {
				this.store.pipe(select(selectQuestionById(id))).subscribe(res => {
					if (res) {
						this.question = res;						
						this.oldQuestion = Object.assign({}, this.question);
						this.initQuestion();
					}
				});
			} else {
				this.question = new PTWQAModel();
				this.question.clear();				
				this.oldQuestion = Object.assign({}, this.question);
				this.initQuestion();
			}
		});
		this.subscriptions.push(queSubscription);
  }


  ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	/**
	 * Init user
	 */
	initQuestion() {
		this.createForm();
		if (!this.question.id) {
			this.subheaderService.setTitle('Create Question');
			this.subheaderService.setBreadcrumbs([
				{ title: 'PTW Pre Question Selection', page: `ptwpre-application-qa` },
				{ title: 'Questions',  page: `ptwpre-application-qa` },
				{ title: 'Create Questions', page: `ptwpre-application-qa/edit` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{ title: 'PTW Pre Question Creation', page: `ptwpre-application-qa` },
			{ title: 'Questions',  page: `ptwpre-application-qa` },
			{ title: 'Edit Questions', page: `ptwpre-application-qa/edit`, queryParams: { id: this.question.id } }
		]);
	}

  createForm() {
		this.questionForm = this.questionFB.group({
			question: [this.question.questions, Validators.required],			
		});
  }
  
  goBackWithId() {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/ptwpre-application-qa`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }
  

  refreshQuestion(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `${this.layoutConfigService.getCurrentMainRoute()}/ptwpre-application-qa/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}


  reset() {
		this.question = Object.assign({}, this.oldQuestion);
		this.createForm();
		this.hasFormErrors = false;
		this.questionForm.markAsPristine();
    this.questionForm.markAsUntouched();
    this.questionForm.updateValueAndValidity();
  }
  
  getComponentTitle() {
	let result = 'Create question';
	if (!this.question || !this.question.id) {
		return result;
	}

	result = `Edit question - ${this.question.questions}`;
	return result;
}

  onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.questionForm.controls;
		/** check form */
		if (this.questionForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedQuestion = this.prepareQuestion();

		if (editedQuestion.id > 0) {
			this.updateQuestion(editedQuestion, withBack);
			return;
		}

		this.addQuestion(editedQuestion, withBack);
  }
  
 
  addQuestion(_que: PTWQAModel, withBack: boolean = false) {
		this.store.dispatch(new QuestionOnServerCreated({ question: _que }));
		const addSubscription = this.store.pipe(select(selectLastCreatedQuestionId)).subscribe(newId => {
			const message = `New Question successfully has been added.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
			if (newId) {
				if (withBack) {
					this.goBackWithId();
				} else {
					this.refreshQuestion(true, newId);
				}
			}
		});
		this.subscriptions.push(addSubscription);
	}

 
  updateQuestion(_que: PTWQAModel, withBack: boolean = false) {
    const updatedQue: Update<PTWQAModel> = {
			id: _que.id,
			changes: _que
		};
		this.store.dispatch(new QuestionUpdated( { partialQuestion: updatedQue, question: _que }));
		const message = `Question successfully has been saved.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
		if (withBack) {
			this.goBackWithId();
		} else {
			this.refreshQuestion(false);
		}
  }


  prepareQuestion() : PTWQAModel {
    const controls = this.questionForm.controls;
		const _que = new PTWQAModel();
		_que.clear();
		
    _que.id = this.question.id;
    _que.questions=this.question.questions;
		_que.questions = controls['question'].value;		
		return _que;
  }

}
