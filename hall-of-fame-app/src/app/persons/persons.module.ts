import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { SharedModule } from '../shared/shared.module';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person/person.component';
import { ResultsModule } from '../results/results.module';
import { PersonRevisionsListComponent } from './person-revisions-list/person-revisions-list.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsListComponent, PersonComponent, PersonRevisionsListComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    SharedModule,
    ResultsModule,
    PipesModule
  ],
  exports: [
    PersonsComponent,
    PersonRevisionsListComponent
  ]
})

export class PersonsModule { }