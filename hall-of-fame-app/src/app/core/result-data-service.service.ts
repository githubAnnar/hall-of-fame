import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelpersModule } from '../shared/helpers/helpers.module';
import { IDeleteResultMessage } from '../shared/idelete-result-message.interface';
import { IGetResultExMessage } from '../shared/iget-result-ex-message.interface';
import { IGetResultMessage } from '../shared/iget-result-message.interface';
import { IGetResultsExMessage } from '../shared/iget-results-ex-message.interface';
import { IGetResultsMessage } from '../shared/iget-results-message.interface';
import { IPatchResultMessage } from '../shared/ipatch-result-message.interface';
import { IPostResultMessage } from '../shared/ipost-result-message.interface';
import { IResult } from '../shared/iresult.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultDataService {

  // local server
  baseUrl: string = 'http://localhost:8000/api/result/'

  helpers: HelpersModule = new HelpersModule();

  constructor(private http: HttpClient) {
    this.helpers = new HelpersModule();
  }

  getAllResults(): Observable<IGetResultsMessage> {
    return this.http.get<IGetResultsMessage>(`${this.baseUrl}getallresults`)
      .pipe(catchError(this.helpers.handleError));
  }

  getAllResultsEx(): Observable<IGetResultsExMessage> {
    return this.http.get<IGetResultsExMessage>(`${this.baseUrl}getallresultsex`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultById(id: number): Observable<IGetResultMessage> {
    return this.http.get<IGetResultMessage>(`${this.baseUrl}getresultbyid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultByIdEx(id: number): Observable<IGetResultExMessage> {
    return this.http.get<IGetResultExMessage>(`${this.baseUrl}getresultbyidex/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultsByPersonId(id: number): Observable<IGetResultsMessage> {
    return this.http.get<IGetResultsMessage>(`${this.baseUrl}getresultsbypersonid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultsByPersonIdEx(id: number): Observable<IGetResultsExMessage> {
    return this.http.get<IGetResultsExMessage>(`${this.baseUrl}getresultsbypersonidex/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultsByRaceId(id: number): Observable<IGetResultsMessage> {
    return this.http.get<IGetResultsMessage>(`${this.baseUrl}getresultsbyraceid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultsByRaceIdEx(id: number): Observable<IGetResultsExMessage> {
    return this.http.get<IGetResultsExMessage>(`${this.baseUrl}getresultsbyraceidex/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultsByClubId(id: number): Observable<IGetResultsMessage> {
    return this.http.get<IGetResultsMessage>(`${this.baseUrl}getresultsbyclubid/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  getResultsByClubIdEx(id: number): Observable<IGetResultsExMessage> {
    return this.http.get<IGetResultsExMessage>(`${this.baseUrl}getresultsbyclubidex/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }

  insertNewResult(result: IResult): Observable<IPostResultMessage> {
    return this.http.post<IPostResultMessage>(`${this.baseUrl}addresult`, result)
      .pipe(catchError(this.helpers.handleError));
  }

  updateResultById(result: IResult): Observable<IPatchResultMessage> {
    return this.http.patch<IPatchResultMessage>(`${this.baseUrl}updateresult`, result)
      .pipe(catchError(this.helpers.handleError));
  }

  deleteResult(id: number): Observable<IDeleteResultMessage> {
    return this.http.delete<IDeleteResultMessage>(`${this.baseUrl}deleteresult/${id}`)
      .pipe(catchError(this.helpers.handleError));
  }
}
