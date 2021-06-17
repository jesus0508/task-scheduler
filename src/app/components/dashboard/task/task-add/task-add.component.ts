import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private taskService: TaskService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', ''],
      cronExpression: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  create(): void {
    this.taskService.add(this.form.value).subscribe(result => {
      this.snackBar.open("Tarea registrada con exito", '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['dashboard']);
    });
  }

}
