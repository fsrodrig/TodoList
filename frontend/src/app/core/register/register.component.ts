import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error: string = null;

  constructor(
    protected userService: UserService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl( null , Validators.required ),
      email: new FormControl( null , [Validators.required, Validators.email] ),
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required )
    }, { validators: this.verifyPass( 'password', 'password2' )  } );
  }

  verifyPass( input1: string, input2: string ) {
    return ( group: FormGroup ) => {

      const pass1 = group.controls[input1].value;
      const pass2 = group.controls[input2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        verifyPass: true
      };

    };
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
     _id: null,
     name: this.form.value.name,
     email: this.form.value.email,
     password: this.form.value.password
    };

    this.userService.save(user).subscribe(
      () => this.router.navigate(['/login']),
      (err) => {
        this.error = err.error.message;
        if (err.status === 400) {
          const errors = err.error.errors.message.split(':');
          this.error = this.error.concat(`. ${errors[errors.length - 1]}`);
        }
      }
    );

  }

}
