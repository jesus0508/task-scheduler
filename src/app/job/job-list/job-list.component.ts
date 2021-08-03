import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobDetailInfoService } from '../shared/services/jobDetailInfo/job-detail-info.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JobDetailInfoDTO } from '../shared/interfaces/JobDetailInfoDTO';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'state', 'cronExpression', 'previousFireTime', 'nextFireTime', 'group', 'actions'];
  dataSource!: MatTableDataSource<JobDetailInfoDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jobDetailService: JobDetailInfoService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteJob(id: number): void {
    this.jobDetailService.delete(id).subscribe(result => {
      this.snackBar.open('Tarea eliminada con éxito!', '', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.loadTasks();
    });
  }

  updateTaskState(id: number, action: number): void {
    this.jobDetailService.updateState(id, action).subscribe(result => {
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.jobDetailService.getAll()
      .subscribe(result => {
        console.log(result);
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  isPaused(state: string): boolean {
    return state == 'PAUSED';
  }

  isNormal(state: string): boolean {
    return state == 'NORMAL';
  }
}
