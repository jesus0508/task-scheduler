import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/Role';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles: Role[] = route.data?.roles;
    if (this.authService.hasRoles(roles)) {
      return true;
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }

}
