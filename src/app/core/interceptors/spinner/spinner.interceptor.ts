import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressIndicatorService } from 'src/app/shared/services/progress-indicator/progress-indicator.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private totalRequest = 0;

  constructor(private progressIndicatorService: ProgressIndicatorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequest++;
    this.progressIndicatorService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequest--;
        if(this.totalRequest === 0) {
          this.progressIndicatorService.hide()
        }
      })
    );
  }
}
