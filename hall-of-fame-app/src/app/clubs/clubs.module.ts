import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubsComponent } from './clubs.component';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsListComponent } from './clubs-list/clubs-list.component';
import { SharedModule } from '../shared/shared.module';
import { ClubComponent } from './club/club.component';
import { ResultsModule } from '../results/results.module';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubsListComponent,
    ClubComponent
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    SharedModule,
    ResultsModule
  ],
  exports: [ClubsComponent]
})

export class ClubsModule { }
