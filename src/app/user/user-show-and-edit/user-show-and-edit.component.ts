import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserProfile } from '../shared/interfaces/UserProfile';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-user-show-and-edit',
  templateUrl: './user-show-and-edit.component.html',
  styleUrls: ['./user-show-and-edit.component.css']
})
export class UserShowAndEditComponent implements OnInit {

  userForm: FormGroup;
  user$!: Observable<UserProfile>;
  username: string = "";

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      names: ['', [Validators.required, Validators.maxLength(50)]],
      firstSurname: ['', [Validators.required, Validators.maxLength(50)]],
      lastSurname: ['', [Validators.required, Validators.maxLength(50)]],
      username: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
    });

  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      map(paramMap => {
        this.username = paramMap.get('username') || "";
        return this.username;
      }),
      switchMap(id => this.userService.getUserProfileByUsername(id))
    )
    this.user$.subscribe(result => {
      this.fillForm(result);
    });
  }

  fillForm(user: UserProfile) {
    this.userForm.patchValue({ ...user });
  }

  updateUserProfile() {
    this.userService.update(this.username, this.userForm.value).subscribe(result => {
      this.snackBar.open("Datos actualizados con exito", '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }
}
