import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcwbsDefMapEditComponent } from './pcwbs-def-map-edit.component';

describe('PcwbsDefMapEditComponent', () => {
  let component: PcwbsDefMapEditComponent;
  let fixture: ComponentFixture<PcwbsDefMapEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcwbsDefMapEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcwbsDefMapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
