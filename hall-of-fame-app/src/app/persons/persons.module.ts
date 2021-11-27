import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { SharedModule } from '../shared/shared.module';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person/person.component';
import { ResultsModule } from '../results/results.module';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsListComponent, PersonComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    SharedModule,
    ResultsModule
  ],
  exports: [PersonsComponent]
})

export class PersonsModule { }