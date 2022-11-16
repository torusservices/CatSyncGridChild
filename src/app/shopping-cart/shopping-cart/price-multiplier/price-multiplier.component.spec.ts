import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriceMultiplierComponent } from './price-multiplier.component';

describe('PriceMultiplierComponent', () => {
  let component: PriceMultiplierComponent;
  let fixture: ComponentFixture<PriceMultiplierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceMultiplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceMultiplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
