import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeviceComponent } from './manage-device.component';

describe('ManageDeviceComponent', () => {
  let component: ManageDeviceComponent;
  let fixture: ComponentFixture<ManageDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDeviceComponent]
    });
    fixture = TestBed.createComponent(ManageDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
