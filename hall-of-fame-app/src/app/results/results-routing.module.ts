import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultAddComponent } from './result-add/result-add.component';
import { ResultsComponent } from './results.component';

const routes: Routes = [
  { path: 'results', component: ResultsComponent },
  { path: 'resultadd', component: ResultAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
