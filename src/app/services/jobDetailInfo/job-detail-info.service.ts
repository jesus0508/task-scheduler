import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobDetailInfo } from 'src/app/interfaces/JobDetailInfo';
import { JobDetailInfoDTO } from 'src/app/interfaces/JobDetailInfoDTO';

const JOB_DETAIL_INFO = 'http://localhost:9191/jobDetails';

@Injectable({
  providedIn: 'root'
})
export class JobDetailInfoService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<JobDetailInfo[]> {
    return this.httpClient.get<JobDetailInfo[]>(JOB_DETAIL_INFO)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getById(id: number) : Observable<JobDetailInfo> {
    return this.httpClient.get<JobDetailInfo>(`${JOB_DETAIL_INFO}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  add(jobDetailInfo: JobDetailInfoDTO): Observable<JobDetailInfo> {
    console.info(jobDetailInfo);
    return this.httpClient.post<JobDetailInfo>(JOB_DETAIL_INFO, jobDetailInfo)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, jobDetailInfo: JobDetailInfoDTO): Observable<JobDetailInfo> {
    return this.httpClient.put<JobDetailInfo>(`${JOB_DETAIL_INFO}/${id}`, jobDetailInfo)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateState(id: number, action: number): Observable<JobDetailInfo> {
    return this.httpClient.put<JobDetailInfo>(`${JOB_DETAIL_INFO}/${id}/state`, { id, action })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${JOB_DETAIL_INFO}/${id}`)
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
