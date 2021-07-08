import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobGroup } from 'src/app/interfaces/JobGroup';

const JOB_GROUPS_URL = 'http://localhost:9191/jobGroups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<JobGroup[]> {
    return this.httpClient.get<JobGroup[]>(JOB_GROUPS_URL)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client error', error.error.message);
    } else {
      console.error('Error status: ', error.status);
      console.error('Error : ', error.error);
    }
    return throwError('Cannot perform the request, please try again later');
  }
  
}
