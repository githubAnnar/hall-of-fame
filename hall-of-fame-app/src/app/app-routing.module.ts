import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanOpen } from './core/can-open.model';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [CanOpen] },
  { path: 'logout', component: LogoutComponent },
  { path: '', pathMatch: 'full', redirectTo: '/races' },
  { path: '**', pathMatch: 'full', redirectTo: '/races' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [CanOpen]
})
export class AppRoutingModule { }
