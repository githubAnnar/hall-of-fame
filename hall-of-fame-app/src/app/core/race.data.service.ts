import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IGetRacesMessage } from '../shared/igetracesmessage-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RaceDataService {

  // local server
  baseUrl: string = 'http://localhost:8000/api/race/'

  // mock server
  fileBaseUrl: string = "assets/";

  constructor(private http: HttpClient) { }

  getRaces(): Observable<IGetRacesMessage> {
    return this.http.get<IGetRacesMessage>(`${this.baseUrl}getallraces`)
      .pipe(catchError(this.handleError));
  }

  // ---- COMMON ----
  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }

    return throwError(error || 'Node.js server error');
  }
}