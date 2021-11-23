import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacesRoutingModule } from './races-routing.module';
import { RacesComponent } from './races.component';
import { RacesListComponent } from './races-list/races-list.component';

@NgModule({
  declarations: [
    RacesComponent,
    RacesListComponent
  ],
  imports: [
    CommonModule,
    RacesRoutingModule
  ],
  exports: [RacesComponent]
})

export class RacesModule { }
