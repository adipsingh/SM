import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcwbsDefMapComponent } from './pcwbs-def-map.component';

describe('PcwbsDefMapComponent', () => {
  let component: PcwbsDefMapComponent;
  let fixture: ComponentFixture<PcwbsDefMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcwbsDefMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcwbsDefMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
