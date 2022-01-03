import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanModerate } from '../core/can-moderate.model';
import { CanOpen } from '../core/can-open.model';
import { ResultAddComponent } from './result-add/result-add.component';
import { ResultsComponent } from './results.component';

const routes: Routes = [
  { path: 'results', component: ResultsComponent, canActivate: [CanOpen] },
  { path: 'resultadd', component: ResultAddComponent, canActivate: [CanOpen, CanModerate] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanOpen, CanModerate]
})
export class ResultsRoutingModule { }
