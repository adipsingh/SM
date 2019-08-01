
import { RouterModule } from '@angular/router';
import { AfectedAreaAndDisciplineComponent } from './afected-area-and-discipline.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AfectedAreaAndDisciplineComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: AfectedAreaAndDisciplineComponent
      },
    ]),
  ]
})
export class AfectedAreaAndDisciplineModule { }
