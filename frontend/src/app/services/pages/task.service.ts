import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { API_URL } from 'src/app/config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from 'src/app/models/task.model';
import { Observable } from 'rxjs';

declare var swal: any;

@Injectable()
export class TaskService {

  url = API_URL + '/tasks';

  constructor(
    protected http: HttpClient
  ) { }

  getAll(pagination: any) {
    return this.http.get(this.url, {params: pagination})
      .pipe(
        map( (res: any) =>  res ),
        catchError( (error: any) => {
          swal( 'Error', error.error.message, 'error');
          return new Observable<any>();
         })
      );
  }

  update(task: Task) {
    return this.http.put(`${this.url}/${task._id}`, task)
      .pipe(
        map( (res: any) => {
          return res.task;
        }),
        catchError( (error: any) => {
          swal( 'Error', error.error.message, 'error');
          return new Observable<any>();
         })
      );
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`)
    .pipe(
      map( (res: any) => {
        swal('Tarea eliminada', `La tarea ${res.task.description} se eliminó con éxito`, 'success');
        console.log(res, 'ok');
        return res.task;
      }),
      catchError( (error: any) => {
        swal( 'Error', error.error.message, 'error');
        console.log(error, 'mal');
        return new Observable<any>();
       })
    );
  }

  search(query: string, status: boolean): Observable<Task[]> {

    const searchParams: any = {};

    if (query !== undefined) {
      searchParams.query = query;
    }

    if (status !== null) {
      searchParams.status = status.toString();
    }

    return this.http.get(`${this.url}/search/`, {params: searchParams})
      .pipe(
        map( (res: any) => res.tasks)
      );
  }
}
