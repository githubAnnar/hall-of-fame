import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubsComponent } from './clubs.component';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsListComponent } from './clubs-list/clubs-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubsListComponent
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    SharedModule
  ],
  exports: [ClubsComponent]
})

export class ClubsModule { }
