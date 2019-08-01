import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodStatementListComponent } from './method-statement-list.component';

describe('MethodStatementListComponent', () => {
  let component: MethodStatementListComponent;
  let fixture: ComponentFixture<MethodStatementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodStatementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
