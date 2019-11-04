import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/service.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: User;
  error: string = null;

  constructor(
    protected loginService: LoginService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  login( form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.user = {
      _id: null,
      email: form.value.email,
      password: form.value.password
    };

    this.loginService.login(this.user).subscribe(
      () => this.router.navigate(['/task'])
    );
  }

}
