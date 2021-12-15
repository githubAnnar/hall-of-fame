import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { ResultAddComponent } from './result-add/result-add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResultsComponent,
    ResultsListComponent,
    ResultAddComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    ResultsListComponent
  ]
})
export class ResultsModule { }
