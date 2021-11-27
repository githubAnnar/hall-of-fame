import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubComponent } from './club/club.component';

import { ClubsComponent } from './clubs.component';

const routes: Routes = [
    { path: 'clubs', component: ClubsComponent },
    { path: 'club/:id', component: ClubComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClubsRoutingModule { }
