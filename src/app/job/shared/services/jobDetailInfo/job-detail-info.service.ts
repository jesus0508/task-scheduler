import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDetailInfoDTO } from '../../interfaces/JobDetailInfoDTO';
import { JobDetailInfoRequest } from '../../interfaces/JobDetailInfoRequest';

const JOB_DETAIL_INFO = 'http://localhost:9191/jobDetails';

@Injectable({
  providedIn: 'root'
})
export class JobDetailInfoService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<JobDetailInfoDTO[]> {
    return this.httpClient.get<JobDetailInfoDTO[]>(JOB_DETAIL_INFO);
  }

  getById(id: number): Observable<JobDetailInfoDTO> {
    return this.httpClient.get<JobDetailInfoDTO>(`${JOB_DETAIL_INFO}/${id}`);
  }

  add(jobDetailInfoRequest: JobDetailInfoRequest): Observable<JobDetailInfoDTO> {
    return this.httpClient.post<JobDetailInfoDTO>(JOB_DETAIL_INFO, jobDetailInfoRequest);
  }

  update(id: number, jobDetailInfoRequest: JobDetailInfoRequest): Observable<JobDetailInfoDTO> {
    return this.httpClient.put<JobDetailInfoDTO>(`${JOB_DETAIL_INFO}/${id}`, jobDetailInfoRequest);
  }

  updateState(id: number, action: number): Observable<JobDetailInfoDTO> {
    return this.httpClient.put<JobDetailInfoDTO>(`${JOB_DETAIL_INFO}/${id}/state`, { id, action });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${JOB_DETAIL_INFO}/${id}`);
  }

}
