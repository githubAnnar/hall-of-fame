import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelpersModule } from '../shared/helpers/helpers.module';
import { IDeleteRaceMessage } from '../shared/idelete-race-message-interface';

import { IGetRaceMessage } from '../shared/igetracemessage-interface';
import { IGetRacesMessage } from '../shared/igetracesmessage-interfaces';
import { IPatchRaceMessage } from '../shared/ipatch-race-message-interface';
import { IPostRaceMessage } from '../shared/ipost-race-message-interface';
import { IRace } from '../shared/irace-interface';

@Injectable({
  providedIn: 'root'
})
export class RaceDataService {

  // local server
  baseUrl: string = 'http://localhost:8000/api/race/'

  // mock server
  fileBaseUrl: string = "assets/";

  helpers: HelpersModule = new HelpersModule();

  constructor(private http: HttpClient) {
    this.helpers = new HelpersModule();
  }

  getAllRaces(): Observable<IGetRacesMessage> {
    return this.http.get<IGetRacesMessage>(`${this.baseUrl}getallraces`)
      .pipe(catchError(this.helpers.handleError));
  }

  getRaceById(id: number): Observable<IGetRaceMessage> {
    return this.http.get<IGetRaceMessage>(`${this.baseUrl}getracebyid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  insertNewRace(race: IRace): Observable<IPostRaceMessage> {
    return this.http.post<IPostRaceMessage>(`${this.baseUrl}addrace`, race)
      .pipe(catchError(this.helpers.handleError));
  }

  updateRace(race: IRace): Observable<IPatchRaceMessage> {
    return this.http.patch<IPatchRaceMessage>(`${this.baseUrl}updaterace`, race)
      .pipe(catchError(this.helpers.handleError));
  }

  deleteRace(id: number): Observable<IDeleteRaceMessage> {
    return this.http.delete<IDeleteRaceMessage>(`${this.baseUrl}deleterace/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }
}