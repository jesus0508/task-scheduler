import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomLoggingJobHistory } from '../../interfaces/CustomLoggingJobHistory';
import { CustomPage } from '../../interfaces/CustomPage';
import { JobDetailDTO } from '../../interfaces/JobDetailDTO';
import { JobDetailRequest } from '../../interfaces/JobDetailRequest';

import { environment } from 'src/environments/environment';

const JOB_DETAIL = environment.apiUrl + '/jobDetails';

@Injectable({
  providedIn: 'root'
})
export class JobDetailService {

  constructor(private httpClient: HttpClient) { }

  getAll(sortColumn: string = "name", sortOrder: string = "asc", pageNumber: number = 0, pageSize: number = 20): Observable<CustomPage<JobDetailDTO>> {
    return this.httpClient.get<CustomPage<JobDetailDTO>>(`${JOB_DETAIL}?page=${pageNumber}&sort=${sortColumn},${sortOrder}`);
  }

  getJobHistory(id: number, sortColumn: string = "firedAt", sortOrder: string = "asc", pageNumber: number = 0, pageSize: number = 20): Observable<CustomPage<CustomLoggingJobHistory>> {
    return this.httpClient.get<CustomPage<CustomLoggingJobHistory>>(`${JOB_DETAIL}/${id}/history?page=${pageNumber}&sort=${sortColumn},${sortOrder}`);
  }

  getById(id: number): Observable<JobDetailDTO> {
    return this.httpClient.get<JobDetailDTO>(`${JOB_DETAIL}/${id}`);
  }

  add(jobDetailRequest: JobDetailRequest): Observable<JobDetailDTO> {
    return this.httpClient.post<JobDetailDTO>(JOB_DETAIL, jobDetailRequest);
  }

  update(id: number, jobDetailRequest: JobDetailRequest): Observable<JobDetailDTO> {
    return this.httpClient.put<JobDetailDTO>(`${JOB_DETAIL}/${id}`, jobDetailRequest);
  }

  updateState(id: number, action: number): Observable<JobDetailDTO> {
    return this.httpClient.put<JobDetailDTO>(`${JOB_DETAIL}/${id}/state`, { id, action });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${JOB_DETAIL}/${id}`);
  }

}
