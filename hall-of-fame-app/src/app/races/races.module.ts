import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacesRoutingModule } from './races-routing.module';
import { RacesComponent } from './races.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RacesRoutingModule
  ],
  exports: [
    RacesComponent
  ]
})

export class RacesModule { }
