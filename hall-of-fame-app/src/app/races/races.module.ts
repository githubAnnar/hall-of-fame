import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RacesRoutingModule } from './races-routing.module';
import { RacesComponent } from './races.component';
import { RacesListComponent } from './races-list/races-list.component';
import { RaceComponent } from './race/race.component';
import { ResultsModule } from '../results/results.module';
import { RaceAddComponent } from './race-add/race-add.component';

@NgModule({
  declarations: [
    RacesComponent,
    RacesListComponent,
    RaceComponent,
    RaceAddComponent
  ],
  imports: [
    CommonModule,
    RacesRoutingModule,
    ResultsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RacesComponent]
})

export class RacesModule { }
