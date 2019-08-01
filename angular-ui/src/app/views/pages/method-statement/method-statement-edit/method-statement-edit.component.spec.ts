import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodStatementEditComponent } from './method-statement-edit.component';

describe('MethodStatementEditComponent', () => {
  let component: MethodStatementEditComponent;
  let fixture: ComponentFixture<MethodStatementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodStatementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodStatementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
