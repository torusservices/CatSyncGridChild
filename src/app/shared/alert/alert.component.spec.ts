import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmptyCartAlertComponent } from './alert.component';

describe('EmptyCartAlertComponent', () => {
  let component: EmptyCartAlertComponent;
  let fixture: ComponentFixture<EmptyCartAlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyCartAlertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
