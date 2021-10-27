import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Setting } from '../interfaces/Setting';

const SETTINGS_URL = environment.apiUrl + '/settings';
@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpClient: HttpClient) { }

  getSettingById(id: number = 1): Observable<Setting> {
    return this.httpClient.get<Setting>(`${SETTINGS_URL}/${id}`);
  }

  update(id: number = 1, setting: Setting): Observable<Setting> {
    return this.httpClient.put<Setting>(`${SETTINGS_URL}/${id}`, setting);
  }

}
