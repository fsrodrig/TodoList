import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html'
})
export class TaskNewComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      descripcion: new FormControl( null , Validators.required ),
      status: new FormControl( false ),
      attached: new FormControl( null )
    });
  }

  save() {
    console.log( this.form.get('attached').value);
  }

}
