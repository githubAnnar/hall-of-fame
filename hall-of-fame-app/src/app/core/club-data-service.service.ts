import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelpersModule } from '../shared/helpers/helpers.module';
import { IClubEx } from '../shared/iclub-ex-interface';
import { IClubRevision } from '../shared/iclub-revision-interface';
import { IGetClubMessage } from '../shared/iget-club-message-interface';
import { IGetClubRevisionsMessage } from '../shared/iget-club-revisions-message-interface';
import { IGetClubsMessage } from '../shared/iget-clubs-message-interface';
import { IPostClubMessage } from '../shared/ipost-club-message-interface';
import { IPostClubRevisionMessage } from '../shared/ipost-club-revision-message-interface';

@Injectable({
  providedIn: 'root'
})
export class ClubDataService {

  // local server
  baseUrl: string = 'http://localhost:8000/api/club/'

  helpers: HelpersModule = new HelpersModule();

  constructor(private http: HttpClient) {
    this.helpers = new HelpersModule();
  }

  getAllClubs(): Observable<IGetClubsMessage> {
    return this.http.get<IGetClubsMessage>(`${this.baseUrl}getallclubs`)
      .pipe(catchError(this.helpers.handleError));
  }

  getClubById(id: number): Observable<IGetClubMessage> {
    return this.http.get<IGetClubMessage>(`${this.baseUrl}getclubbyid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getClubRevisionsById(id: number): Observable<IGetClubRevisionsMessage> {
    return this.http.get<IGetClubRevisionsMessage>(`${this.baseUrl}getclubrevisionsbyid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  insertNewClub(club: IClubEx): Observable<IPostClubMessage> {
    return this.http.post<IPostClubMessage>(`${this.baseUrl}addclub`, club)
      .pipe(catchError(this.helpers.handleError));
  }

  insertClubRevisionById(clubRevision: IClubRevision): Observable<IPostClubRevisionMessage> {
    return this.http.post<IPostClubRevisionMessage>(`${this.baseUrl}addclubrevision`, clubRevision)
      .pipe(catchError(this.helpers.handleError));
  }
}
