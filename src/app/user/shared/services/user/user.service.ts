import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../interfaces/UserProfile';

import { environment } from 'src/environments/environment';

const USERS_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserProfileByUsername(username: string): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${USERS_URL}/${username}/profile`);
  }

  update(username: string, userProfile: UserProfile): Observable<UserProfile> {
    return this.httpClient.put<UserProfile>(`${USERS_URL}/${username}/profile`, userProfile);
  }

}
