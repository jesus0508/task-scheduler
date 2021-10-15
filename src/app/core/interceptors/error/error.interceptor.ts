import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ProgressIndicatorService } from 'src/app/shared/services/progress-indicator/progress-indicator.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private progressIndicatorService: ProgressIndicatorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.progressIndicatorService.hide();
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Client error: ', error.error.message);
      } else if (error.status == 401 || error.status == 403) {
        console.error('Error: ', error.error);
        this.authService.logout();
        this.router.navigate(['/login']).then();
      } else {
        console.error('Error status: ', error.status);
        console.error('Error: ', error.error);
      }
    } else {
      console.error('Unknown Error: ', error);
    }
    return throwError('Cannot perform the request, please try again later');
  }
}
