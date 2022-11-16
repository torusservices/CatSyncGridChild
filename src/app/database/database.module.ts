import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { DatabaseComponent } from './database/database.component';
import { MaterialModule } from '../material/material.module';
import { MetalsApiComponent } from './metals-api/metals-api.component';


@NgModule({
  declarations: [ DatabaseComponent, MetalsApiComponent],
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    MaterialModule
  ]
})
export class DatabaseModule { }
