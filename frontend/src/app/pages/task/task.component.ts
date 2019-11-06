import {
  Component,
  OnInit
} from '@angular/core';
import {
  TaskService
} from 'src/app/services/service.index';
import {
  Observable
} from 'rxjs';
import {
  Task
} from 'src/app/models/task.model';
import {
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: []
})
export class TaskComponent implements OnInit {

  tasks: Observable < Task[]>;
  items: Observable<number>;

  searchBox: string;
  statusBox: boolean = null;

  page = 0;
  perPage = 5;

  constructor(
    protected taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskService.getAll({
      page: this.page,
      per_page: this.perPage
    }).pipe(
      map(
        (res: any) => {
          this.tasks = res.tasks;
          this.items = res.count;
        }
      )
    );
  }

  changeStatus(task: Task) {
    task.status = !task.status;
    this.taskService.update(task).subscribe((res) => console.log(res));
  }

  delete(task: Task) {
    this.taskService.delete(task._id)
      .subscribe(
        () => this.tasks = this.tasks.pipe(
          map(
            (tasks) => tasks.filter(
              (oldTask) => task !== oldTask
            )
          ))
      );
  }

  search() {
    this.tasks = this.taskService.search(this.searchBox, this.statusBox);
  }

}
