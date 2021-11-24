import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelpersModule } from '../shared/helpers/helpers.module';
import { IGetPersonMessage } from '../shared/iget-person-message.interface';
import { IGetPersonRevisionsMessage } from '../shared/iget-person-revisions-message.interface';
import { IGetPersonsMessage } from '../shared/iget-persons-message.interface';
import { IPersonEx } from '../shared/iperson-ex.interface';
import { IPersonRevision } from '../shared/iperson-revision.interface';
import { IPostPersonMessage } from '../shared/ipost-person-message.interface';
import { IPostPersonRevisionMessage } from '../shared/ipost-person-revision-message.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  // local server
  baseUrl: string = 'http://localhost:8000/api/person/'

  helpers: HelpersModule = new HelpersModule();

  constructor(private http: HttpClient) {
    this.helpers = new HelpersModule();
  }

  getAllPersons(): Observable<IGetPersonsMessage> {
    return this.http.get<IGetPersonsMessage>(`${this.baseUrl}getallpersons`)
      .pipe(catchError(this.helpers.handleError));
  }

  getPersonById(id: number): Observable<IGetPersonMessage> {
    return this.http.get<IGetPersonMessage>(`${this.baseUrl}getpersonbyid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getPersonRevisionsById(id: number): Observable<IGetPersonRevisionsMessage> {
    return this.http.get<IGetPersonRevisionsMessage>(`${this.baseUrl}getpersonrevisionsbyid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getPersonRevisionsByRaceId(id: number): Observable<IGetPersonRevisionsMessage> {
    return this.http.get<IGetPersonRevisionsMessage>(`${this.baseUrl}getpersonrevisionsbyraceid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  insertPersonRevisionById(personRevision: IPersonRevision): Observable<IPostPersonRevisionMessage> {
    return this.http.post<IPostPersonRevisionMessage>(`${this.baseUrl}addpersonrevision`, personRevision)
      .pipe(catchError(this.helpers.handleError));
  }

  insertNewPerson(person: IPersonEx): Observable<IPostPersonMessage> {
    return this.http.post<IPostPersonMessage>(`${this.baseUrl}addperson`, person)
      .pipe(catchError(this.helpers.handleError));
  }
}
