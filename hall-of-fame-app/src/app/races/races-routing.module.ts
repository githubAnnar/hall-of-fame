import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaceAddComponent } from './race-add/race-add.component';
import { RaceComponent } from './race/race.component';
import { RacesComponent } from './races.component';

const routes: Routes = [
    { path: 'races', component: RacesComponent },
    { path: 'race/:id', component: RaceComponent },
    { path: 'raceadd', component: RaceAddComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RacesRoutingModule { }