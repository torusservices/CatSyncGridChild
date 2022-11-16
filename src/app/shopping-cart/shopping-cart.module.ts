import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ProductQtyUpdaterComponent } from './product-qty-updater/product-qty-updater.component';
import { CustomItemComponent } from './custom-item/custom-item.component';
import { DialogOverviewExampleDialog } from './custom-item/custom-item.component';
import { FormsModule } from '@angular/forms';
import { PriceMultiplierComponent, DialogSlider} from './shopping-cart/price-multiplier/price-multiplier.component';

@NgModule({
  declarations: [ShoppingCartComponent, ProductQtyUpdaterComponent, CustomItemComponent, DialogOverviewExampleDialog, PriceMultiplierComponent, DialogSlider,],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShoppingCartRoutingModule,
    FormsModule,
  ]
})
export class ShoppingCartModule { }
