import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Task } from '../interfaces/Task';
import { TaskAction } from '../interfaces/TaskAction';

const TASKS_URL = 'http://localhost:9191/tasks'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpCliente: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.httpCliente.get<Task[]>(`${TASKS_URL}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  add(task: Task): Observable<Task> {
    console.log(task);
    return this.httpCliente.post<Task>(`${TASKS_URL}`, task)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(task: Task): Observable<Task> {
    return this.httpCliente.put<Task>(`${TASKS_URL}/${task.id}`, task)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateState(taskAction: TaskAction): Observable<Task> {
    return this.httpCliente.put<Task>(`${TASKS_URL}/${taskAction.id}`, taskAction)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void>{
    return this.httpCliente.delete<void>(`${TASKS_URL}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client error', error.error.message);
    } else {
      console.error('Error status: ', error.status);
      console.error('Error : ', error.error);
    }
    return throwError('Cannot perform the request, please try again later');
  }
}
