import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanModerate } from '../core/can-moderate.model';
import { CanOpen } from '../core/can-open.model';
import { ClubAddComponent } from './club-add/club-add.component';
import { ClubRevisionAddComponent } from './club-revision-add/club-revision-add.component';
import { ClubComponent } from './club/club.component';

import { ClubsComponent } from './clubs.component';

const routes: Routes = [
    { path: 'clubs', component: ClubsComponent, canActivate: [CanOpen] },
    { path: 'club/:id', component: ClubComponent, canActivate: [CanOpen] },
    { path: 'clubadd', component: ClubAddComponent, canActivate: [CanOpen, CanModerate] },
    { path: 'clubrevisionadd/:clubid', component: ClubRevisionAddComponent, canActivate: [CanOpen, CanModerate] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanModerate, CanOpen]
})
export class ClubsRoutingModule { }
