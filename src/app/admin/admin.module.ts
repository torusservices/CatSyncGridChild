import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    FormsModule,
  ]
})
export class AdminModule { 

}
