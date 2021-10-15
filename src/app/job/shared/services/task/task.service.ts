import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/Task';

import { environment } from 'src/environments/environment';

const TASKS_URL = environment.apiUrl + '/tasks'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpCliente: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.httpCliente.get<Task[]>(`${TASKS_URL}`);
  }

  add(task: Task): Observable<Task> {
    return this.httpCliente.post<Task>(`${TASKS_URL}`, task);
  }

  update(task: Task): Observable<Task> {
    return this.httpCliente.put<Task>(`${TASKS_URL}/${task.id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.httpCliente.delete<void>(`${TASKS_URL}/${id}`);
  }

}
