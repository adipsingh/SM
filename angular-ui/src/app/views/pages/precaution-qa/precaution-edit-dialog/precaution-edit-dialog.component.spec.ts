import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecautionEditDialogComponent } from './precaution-edit-dialog.component';

describe('PrecautionEditDialogComponent', () => {
  let component: PrecautionEditDialogComponent;
  let fixture: ComponentFixture<PrecautionEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecautionEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecautionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
