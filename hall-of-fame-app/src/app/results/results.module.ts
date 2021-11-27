import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { ResultsListComponent } from './results-list/results-list.component';


@NgModule({
  declarations: [
    ResultsComponent,
    ResultsListComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule
  ],
  exports: [
    ResultsListComponent
  ]
})
export class ResultsModule { }
