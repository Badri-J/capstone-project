import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLicenseComponent } from './update-license.component';

describe('UpdateLicenseComponent', () => {
  let component: UpdateLicenseComponent;
  let fixture: ComponentFixture<UpdateLicenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLicenseComponent]
    });
    fixture = TestBed.createComponent(UpdateLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
