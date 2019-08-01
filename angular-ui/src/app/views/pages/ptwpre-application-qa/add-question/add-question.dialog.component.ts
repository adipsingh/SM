import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
@Component({
     selector: 'kt-add-question-dialog',
     templateUrl: './add-question.dialog.component.html',
     changeDetection: ChangeDetectionStrategy.Default,
})
export class AddQuestionDialogComponent implements OnInit, OnDestroy {
     // Private properties
     private componentSubscriptions: Subscription;
     /**
      * Component constructor
      *
      * @param dialogRef: MatDialogRef<RoleEditDialogComponent>
      * @param data: any
      * @param store: Store<AppState>
      */
     constructor(public dialogRef: MatDialogRef<AddQuestionDialogComponent>,
          @Inject(MAT_DIALOG_DATA)
          public data: any, private store: Store<AppState>) { }
     /**
      * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
      */
     /**
      * On init
      */
     ngOnInit() {
     }
     /**
      * On destroy
      */
     ngOnDestroy() {
          if (this.componentSubscriptions) {
               this.componentSubscriptions.unsubscribe();
          }
     }
}
