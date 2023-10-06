import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSoftwareComponent } from './manage-software.component';

describe('ManageSoftwareComponent', () => {
  let component: ManageSoftwareComponent;
  let fixture: ComponentFixture<ManageSoftwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSoftwareComponent]
    });
    fixture = TestBed.createComponent(ManageSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
