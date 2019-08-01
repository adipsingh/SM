import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreapplicationQaComponent } from './preapplication-qa.component';

describe('PreapplicationQaComponent', () => {
  let component: PreapplicationQaComponent;
  let fixture: ComponentFixture<PreapplicationQaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreapplicationQaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreapplicationQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
