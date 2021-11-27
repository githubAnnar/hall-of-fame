import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RacesModule,
    ClubsModule,
    PersonsModule,
    ResultsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
