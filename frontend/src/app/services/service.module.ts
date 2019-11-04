import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  UserService,
  LoginService,
  LoginGuard,
  TaskService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    LoginService,
    LoginGuard,
    TaskService
  ],
  declarations: []
})
export class ServiceModule { }
