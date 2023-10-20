import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLicensesComponent } from './assign-licenses.component';

describe('AssignLicensesComponent', () => {
  let component: AssignLicensesComponent;
  let fixture: ComponentFixture<AssignLicensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLicensesComponent]
    });
    fixture = TestBed.createComponent(AssignLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
