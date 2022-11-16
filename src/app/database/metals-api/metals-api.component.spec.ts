import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetalsApiComponent } from './metals-api.component';

describe('MetalsApiComponent', () => {
  let component: MetalsApiComponent;
  let fixture: ComponentFixture<MetalsApiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalsApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
