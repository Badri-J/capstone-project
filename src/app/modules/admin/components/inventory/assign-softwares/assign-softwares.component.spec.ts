import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSoftwaresComponent } from './assign-softwares.component';

describe('AssignSoftwaresComponent', () => {
  let component: AssignSoftwaresComponent;
  let fixture: ComponentFixture<AssignSoftwaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignSoftwaresComponent]
    });
    fixture = TestBed.createComponent(AssignSoftwaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
