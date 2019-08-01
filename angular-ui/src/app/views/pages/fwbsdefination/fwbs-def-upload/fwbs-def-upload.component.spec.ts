import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FwbsDefUploadComponent } from './fwbs-def-upload.component';

describe('FwbsDefUploadComponent', () => {
  let component: FwbsDefUploadComponent;
  let fixture: ComponentFixture<FwbsDefUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FwbsDefUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FwbsDefUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
