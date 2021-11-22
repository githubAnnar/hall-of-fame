import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RaceDataService } from './race-data-service.service';
import { ClubDataService } from './club-data-service.service';
import { SorterService } from './sorter-service.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [RaceDataService, ClubDataService, SorterService]
})
export class CoreModule { }
