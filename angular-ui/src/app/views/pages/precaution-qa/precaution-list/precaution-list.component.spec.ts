import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecautionListComponent } from './precaution-list.component';

describe('PrecautionListComponent', () => {
  let component: PrecautionListComponent;
  let fixture: ComponentFixture<PrecautionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecautionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecautionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
