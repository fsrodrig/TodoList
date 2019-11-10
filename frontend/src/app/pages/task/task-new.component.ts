import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FilesService, TaskService } from 'src/app/services/service.index';
import { Task } from 'src/app/models/task.model';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html'
})
export class TaskNewComponent implements OnInit {

  form: FormGroup;
  attached: File = null;

  constructor(
    protected filesService: FilesService,
    protected taskService: TaskService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl( null , Validators.required ),
      status: new FormControl( false )
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const task: Task = {
      _id: null,
      description: this.form.value.description,
      status: this.form.value.status
    };

    this.taskService.save(task).subscribe(
      (saved) => {
        if (this.attached !== null) {
          this.filesService.upload(this.attached, saved._id)
            .then(
              () => {
                swal('Felicitaciones', `Tarea ${saved._id} creada con éxito`, 'success');
                this.router.navigate(['/task']);
              })
            .catch(
              (err) => swal('Error al subir archivo', err.errors.message, 'error'));
        } else {
          swal('Felicitaciones', `Tarea ${saved._id} creada con éxito`, 'success');
          this.router.navigate(['/task']);
        }
      }
    );
  }

  choosenFile(file: File) {
    if (!file) {
      return;
    }

    this.attached = file;
  }



}
