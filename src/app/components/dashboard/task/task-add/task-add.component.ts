import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobDetailInfoDTO } from 'src/app/interfaces/JobDetailInfoDTO';
import { JobDetailInfoService } from 'src/app/services/jobDetailInfo/job-detail-info.service';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  selectedValue: number;

  constructor(private snackBar: MatSnackBar, private jobDetailInfoService: JobDetailInfoService, private router: Router) {
    this.selectedValue = 0;
  }

  ngOnInit(): void {

  }

  create(jobDetailInfoDTO: JobDetailInfoDTO): void {
    this.jobDetailInfoService.add(jobDetailInfoDTO).subscribe(result => {
      this.snackBar.open("Tarea registrada con exito", '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['dashboard']);
    });
  }

  isBatchJob(): boolean {
    return this.selectedValue == 2;
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
