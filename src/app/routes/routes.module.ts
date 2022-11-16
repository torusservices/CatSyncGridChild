import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { MaterialModule } from '../material/material.module';
import { LocationComponent } from './location/location.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoutesComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class RoutesModule { }
