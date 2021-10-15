import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobDetailService } from '../shared/services/jobDetail/job-detail.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JobDetailDTO } from '../shared/interfaces/JobDetailDTO';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponentComponent } from 'src/app/shared/components/confirmation-dialog-component/confirmation-dialog-component.component';
import { catchError, debounceTime, filter, finalize, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { merge, of, Subject } from 'rxjs';
import { JobAction } from '../shared/interfaces/JobAction';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'group', 'cronExpression', 'previousFireTime', 'nextFireTime', 'state', 'actions'];
  dataSource!: MatTableDataSource<JobDetailDTO>;
  updateTaskStateRequest$ = new Subject<JobAction>();
  refresh$ = new Subject<boolean>();
  disableButton: boolean = false;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private jobDetailService: JobDetailService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.updateTaskStateRequest().subscribe(result => {
      this.showConfirmationMessage('Tarea actualizada con exito');
      this.loadTasks(result.content);
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    // // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.refresh$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.jobDetailService.getAll(this.sort.active, this.sort.direction, this.paginator.pageIndex)
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
      ).subscribe(data => this.loadTasks(data));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue?.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteJob(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent);

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(result => this.jobDetailService.delete(id)),
        switchMap(result => this.getAllTasks())
      ).subscribe(result => {
        this.showConfirmationMessage('Tarea eliminada con exito');
        this.loadTasks(result.content);
      });
  }

  updateTaskState(id: number, action: number): void {
    this.disableButton = true;
    this.updateTaskStateRequest$.next({ id, action });
  }

  private updateTaskStateRequest() {
    return this.updateTaskStateRequest$.pipe(
      debounceTime(1000),
      switchMap(({ id, action }) => this.jobDetailService.updateState(id, action)),
      switchMap(result => this.getAllTasks()),
    );
  }

  private getAllTasks() {
    return this.jobDetailService.getAll().pipe(finalize(() => this.disableButton = false));
  }

  private loadTasks(result: JobDetailDTO[]): void {
    this.dataSource = new MatTableDataSource(result)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private showConfirmationMessage(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  isPaused(state: string): boolean {
    return state == 'PAUSED';
  }

  isNormal(state: string): boolean {
    return state == 'NORMAL';
  }

  refresh() {
    this.refresh$.next(true);
  }
}
