import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loggedIn: boolean;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.loggedIn = false;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const { username, password } = this.form.value;
    if (username == "admin" && password == "admin") {
      this.fakeLoading();
      this.form.reset();
    } else {
      this._snackBar.open("Credenciales incorrectas", '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    }
  }

  fakeLoading(): void {
    this.loggedIn = true;
    setTimeout(() => {
      this.router.navigate([
        'dashboard'
      ]);
    }, 1500);
  }
}
