import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { SharedModule } from '../shared/shared.module';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person/person.component';
import { ResultsModule } from '../results/results.module';
import { PersonRevisionsListComponent } from './person-revisions-list/person-revisions-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { PersonAddComponent } from './person-add/person-add.component';
import { PersonRevisionAddComponent } from './person-revision-add/person-revision-add.component';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsListComponent, PersonComponent, PersonRevisionsListComponent, PersonAddComponent, PersonRevisionAddComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    SharedModule,
    ResultsModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PersonsComponent,
    PersonRevisionsListComponent
  ]
})

export class PersonsModule { }