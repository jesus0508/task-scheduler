import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task'
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'group', 'cronExpression', 'state', 'actions'];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe(result => {
      this.snackBar.open('Tarea eliminada con éxito!', '', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.loadTasks();
    });
  }

  updateTaskState(id: number, action: number): void {
    this.taskService.updateState({ id, action }).subscribe(result => {
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.taskService.getAll()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

}
