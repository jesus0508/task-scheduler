import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JobDetailInfo } from 'src/app/interfaces/JobDetailInfo';
import { JobDetailInfoDTO } from 'src/app/interfaces/JobDetailInfoDTO';
import { JobDetailInfoService } from 'src/app/services/jobDetailInfo/job-detail-info.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  jobDetailInfo!: Observable<JobDetailInfo>;
  id: number;

  constructor(private snackBar: MatSnackBar, private jobDetailInfoService: JobDetailInfoService, private router: Router, private route: ActivatedRoute) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.jobDetailInfo = this.route.paramMap.pipe(
      map(paramMap => {
        this.id = parseInt(paramMap.get('id') || '0')
        return this.id;
      }),
      switchMap(id => this.jobDetailInfoService.getById(id))
    )
  }

  update(jobDetailInfoDTO: JobDetailInfoDTO): void {
    this.jobDetailInfoService.update(this.id, jobDetailInfoDTO)
      .subscribe(result => {
        console.log(`Imprimiendo resultado: ${result}`);
        this.router.navigate(['dashboard']);
        this.snackBar.open("Tarea actualizada con exito", '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

}
