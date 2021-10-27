import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CustomLoggingJobHistory } from '../shared/interfaces/CustomLoggingJobHistory';
import { JobDetailDTO } from '../shared/interfaces/JobDetailDTO';
import { JobDetailService } from '../shared/services/jobDetail/job-detail.service';

@Component({
  selector: 'app-job-show',
  templateUrl: './job-show.component.html',
  styleUrls: ['./job-show.component.css']
})
export class JobShowComponent implements OnInit {
  jobDetailDto!: JobDetailDTO;
  customLoggingJobHistory!: CustomLoggingJobHistory;
  id: number;
  dataSource = new MatTableDataSource<CustomLoggingJobHistory>();

  isLoadingResults: boolean = true;
  resultsLength: number = 0;
  displayedColumns: string[] = ['id', 'status', 'firedAt', 'completedAt', 'result'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jobDetailService: JobDetailService, private router: Router, private route: ActivatedRoute) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(paramMap => {
        this.id = parseInt(paramMap.get('id') || '0')
        return this.id;
      }),
      switchMap(id => this.jobDetailService.getById(id))
    ).subscribe(result => this.jobDetailDto = result);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.jobDetailService.getJobHistory(this.id, this.sort.active, this.sort.direction, this.paginator.pageIndex)
            .pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.totalElements;
          return data.content;
        })
      ).subscribe(data => {
        this.dataSource.data = data;
      });
  }

}