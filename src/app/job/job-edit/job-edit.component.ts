import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JobDetailDTO } from '../shared/interfaces/JobDetailDTO';
import { JobDetailRequest } from '../shared/interfaces/JobDetailRequest';
import { JobDetailService } from '../shared/services/jobDetail/job-detail.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobDetail!: Observable<JobDetailDTO>;
  id: number;

  constructor(private snackBar: MatSnackBar, private jobDetailService: JobDetailService, private router: Router, private route: ActivatedRoute) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.jobDetail = this.route.paramMap.pipe(
      map(paramMap => {
        this.id = parseInt(paramMap.get('id') || '0')
        return this.id;
      }),
      switchMap(id => this.jobDetailService.getById(id))
    )
  }

  update(jobDetailRequest: JobDetailRequest): void {
    this.jobDetailService.update(this.id, jobDetailRequest)
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
