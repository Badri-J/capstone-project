import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeviceComponent } from './request-device.component';

describe('RequestDeviceComponent', () => {
  let component: RequestDeviceComponent;
  let fixture: ComponentFixture<RequestDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDeviceComponent]
    });
    fixture = TestBed.createComponent(RequestDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
