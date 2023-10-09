import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLogedInComponent } from './not-loged-in.component';

describe('NotLogedInComponent', () => {
  let component: NotLogedInComponent;
  let fixture: ComponentFixture<NotLogedInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotLogedInComponent]
    });
    fixture = TestBed.createComponent(NotLogedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
