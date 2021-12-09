import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClubsComponent } from './clubs.component';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsListComponent } from './clubs-list/clubs-list.component';
import { SharedModule } from '../shared/shared.module';
import { ClubComponent } from './club/club.component';
import { ResultsModule } from '../results/results.module';
import { ClubRevisionsListComponent } from './club-revisions-list/club-revisions-list.component';
import { ClubAddComponent } from './club-add/club-add.component';
import { ClubRevisionAddComponent } from './club-revision-add/club-revision-add.component';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubsListComponent,
    ClubComponent,
    ClubRevisionsListComponent,
    ClubAddComponent,
    ClubRevisionAddComponent
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    SharedModule,
    ResultsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ClubsComponent,
    ClubRevisionsListComponent
  ]
})

export class ClubsModule { }
