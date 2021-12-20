import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RacesModule } from './races/races.module';
import { ClubsModule } from './clubs/clubs.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PersonsModule } from './persons/persons.module'
import { ResultsModule } from './results/results.module';
import { PipesModule } from './pipes/pipes.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    ReactiveFormsModule,
    RacesModule,
    ClubsModule,
    PersonsModule,
    ResultsModule,
    AppRoutingModule,
    CoreModule,
    PipesModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
