import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobDetailRequest } from '../shared/interfaces/JobDetailRequest';
import { JobDetailService } from '../shared/services/jobDetail/job-detail.service';


@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  selectedValue: number;

  constructor(private snackBar: MatSnackBar, private jobDetailService: JobDetailService, private router: Router) {
    this.selectedValue = 0;
  }

  ngOnInit(): void {

  }

  create(jobDetailRequest: JobDetailRequest): void {
    this.jobDetailService.add(jobDetailRequest).subscribe(result => {
      this.router.navigate(['tasks']);
      this.snackBar.open("Tarea registrada con exito", '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }

  isBatchJob(): boolean {
    return this.selectedValue == 2;
  }

}
