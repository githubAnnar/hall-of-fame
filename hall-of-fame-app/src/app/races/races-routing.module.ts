import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanModerate } from '../core/can-moderate.model';
import { CanOpen } from '../core/can-open.model';
import { RaceAddComponent } from './race-add/race-add.component';
import { RaceComponent } from './race/race.component';
import { RacesComponent } from './races.component';

const routes: Routes = [
    { path: 'races', component: RacesComponent, canActivate: [CanOpen] },
    { path: 'race/:id', component: RaceComponent, canActivate: [CanOpen] },
    { path: 'raceadd', component: RaceAddComponent, canActivate: [CanOpen, CanModerate] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanModerate, CanOpen]
})
export class RacesRoutingModule { }