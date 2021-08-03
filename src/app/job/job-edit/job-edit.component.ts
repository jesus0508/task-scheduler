import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JobDetailInfoDTO } from '../shared/interfaces/JobDetailInfoDTO';
import { JobDetailInfoRequest } from '../shared/interfaces/JobDetailInfoRequest';
import { JobDetailInfoService } from '../shared/services/jobDetailInfo/job-detail-info.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobDetailInfo!: Observable<JobDetailInfoDTO>;
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

  update(jobDetailInfoRequest: JobDetailInfoRequest): void {
    this.jobDetailInfoService.update(this.id, jobDetailInfoRequest)
      .subscribe(result => {
        this.router.navigate(['tasks']);
        this.snackBar.open("Tarea actualizada con exito", '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      });
  }

}
