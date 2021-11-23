import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { SharedModule } from '../shared/shared.module';
import { PersonsComponent } from './persons.component';

@NgModule({
  declarations: [
    PersonsComponent, 
    PersonsListComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    SharedModule
  ],
  exports:[PersonsComponent]
})

export class PersonsModule { }