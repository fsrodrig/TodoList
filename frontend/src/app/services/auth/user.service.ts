import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { User } from 'src/app/models/user.model';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable()
export class UserService {

  url = API_URL + '/users';

  constructor(
    protected http: HttpClient
  ) { }

  save( user: User) {
    return this.http.post(this.url, user)
    .pipe(
      map( (res: any) => {
        swal('Usuario creado', user.email, 'success');
        return res.user;
      })
    );
  }
}
