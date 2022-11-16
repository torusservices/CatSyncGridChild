import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductQtyUpdaterComponent } from './product-qty-updater.component';

describe('ProductQtyUpdaterComponent', () => {
  let component: ProductQtyUpdaterComponent;
  let fixture: ComponentFixture<ProductQtyUpdaterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQtyUpdaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQtyUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
