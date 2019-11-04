import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  userId: string = null;
  token: string = null;

  url = API_URL + '/login';

  constructor(
    protected http: HttpClient,
    protected router: Router
    ) {
    this.loadData();
  }

  login( user: User) {
    return this.http.post(this.url, user)
    .pipe(
      map( (res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        this.userId = res.id;
        this.token = res.token;
        return true;
      })
    );
  }

  logout() {
    this.userId = null;
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private loadData() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.userId = localStorage.getItem('id');
    }
  }

  isAuthenticated() {
    return this.token !== null;
  }
}
