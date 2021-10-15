import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError, skip } from 'rxjs/operators';
import { AuthService } from '../core/services/auth/auth.service';
import { ProgressIndicatorService } from '../shared/services/progress-indicator/progress-indicator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading: boolean = false;
  isLoading!: Subscription;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private authService: AuthService, public progressIndicatorService: ProgressIndicatorService) {
    this.form = this.fb.group({
      username: ['username', [Validators.required, Validators.maxLength(50)]],
      password: ['password', [Validators.required, Validators.maxLength(50)]]
    });
    this.isLoading = this.progressIndicatorService.isLoading$
      .pipe(skip(1)) // F T F
      .subscribe(loading => {
        this.loading = loading;
      });
  }

  ngOnInit(): void {
  }

  login(): void {
    const { username, password } = this.form.value;
    this.authService.login(username, password)
      .pipe(catchError(error => this.handleError(error)))
      .subscribe(user => {
        this.router.navigate(['tasks']);
      });
  }

  private handleError(error: HttpErrorResponse) {
    this.snackBar.open("Usuario no existe!", '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    return throwError("User dosen't exist!");
  }

  ngOnDestroy(): void {
    this.isLoading.unsubscribe();
  }

}

