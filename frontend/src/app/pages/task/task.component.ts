import {
  Component,
  OnInit
} from '@angular/core';
import {
  TaskService, FilesService
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

import {saveAs} from 'file-saver';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: []
})
export class TaskComponent implements OnInit {

  tasks: Observable < Task[]>;

  searchBox: string;
  statusBox: boolean = null;

  constructor(
    protected taskService: TaskService,
    protected fileService: FilesService
  ) {}

  ngOnInit() {
    this.tasks = this.taskService.getAll();
  }

  changeStatus(task: Task) {
    task.status = !task.status;
    this.taskService.update(task).subscribe();
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

  download(fileName: string) {
    this.fileService.download(fileName)
    .subscribe(blob => {
      saveAs(blob, fileName);
    });
  }

}
