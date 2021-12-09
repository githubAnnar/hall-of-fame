import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubAddComponent } from './club-add/club-add.component';
import { ClubRevisionAddComponent } from './club-revision-add/club-revision-add.component';
import { ClubComponent } from './club/club.component';

import { ClubsComponent } from './clubs.component';

const routes: Routes = [
    { path: 'clubs', component: ClubsComponent },
    { path: 'club/:id', component: ClubComponent },
    { path: 'clubadd', component: ClubAddComponent },
    { path: 'clubrevisionadd/:clubid', component: ClubRevisionAddComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClubsRoutingModule { }
