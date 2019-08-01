import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Preapplication1QaComponent } from './preapplication1-qa.component';

describe('Preapplication1QaComponent', () => {
  let component: Preapplication1QaComponent;
  let fixture: ComponentFixture<Preapplication1QaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Preapplication1QaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Preapplication1QaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
