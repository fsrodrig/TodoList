import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public loginService: LoginService,
               public router: Router ) {}

  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      swal('No posee permisos', 'error');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
