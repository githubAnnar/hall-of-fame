import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonAddComponent } from './person-add/person-add.component';
import { PersonComponent } from './person/person.component';

import { PersonsComponent } from './persons.component';

const routes: Routes = [
  { path: 'persons', component: PersonsComponent },
  { path: 'person/:id', component: PersonComponent },
  { path: 'personadd', component: PersonAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
