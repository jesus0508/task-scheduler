import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../interfaces/Group';

import { environment } from 'src/environments/environment';

const JOB_GROUPS_URL = environment.apiUrl + '/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(JOB_GROUPS_URL);
  }

}
