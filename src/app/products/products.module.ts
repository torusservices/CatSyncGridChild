import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products.component';
import { MaterialModule } from '../material/material.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { CheckPriceComponent, DialogOverviewExampleDialog2 } from './product-card/check-price/check-price.component';


@NgModule({
  declarations: [CategoriesListComponent, ProductsListComponent, ProductsComponent, ProductCardComponent, CheckPriceComponent, DialogOverviewExampleDialog2],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
