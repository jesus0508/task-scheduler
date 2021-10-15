import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Role } from '../../interfaces/Role';
import { TokenDTO } from '../../interfaces/TokenDTO';
import { User } from '../../interfaces/User';

import { environment } from 'src/environments/environment';

const AUTH_URL = environment.apiUrl + '/users';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: Subject<User> = new Subject<User>();
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private user: User | undefined;
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      })
    };

    return this.httpClient.post<TokenDTO>(`${AUTH_URL}/login`, {}, httpOptions)
      .pipe(
        map(token => this.toUser(token.accessToken)),
        map(user => {
          this.user = user;
          this.storageService.set('user', this.user);
          this.user$.next(this.user);
          this.loggedIn$.next(true);
          return user;
        })
      );
  }

  userLogged(): Observable<User> {
    return this.user$.asObservable();
  }

  loggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private toUser(token: string): User {
    const decodeToken = jwtHelper.decodeToken(token);
    return { token, user: decodeToken.user, name: decodeToken.name, role: decodeToken.role };
  }

  getToken(): string {
    if (!this.isAuthenticated()) {
      this.logout();
      return "";
    }
    return this.user?.token || '';
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user?.role || Role.NONE);
  }

  isAuthenticated(): boolean {
    return this.user != null && !jwtHelper.isTokenExpired(this.user.token);
  }

  logout(): void {
    this.user = undefined;
    this.user$.next(this.user);
    this.loggedIn$.next(false);
    this.storageService.clean();
  }

  getName(): string {
    return this.user ? this.user.name : '???';
  }

}
