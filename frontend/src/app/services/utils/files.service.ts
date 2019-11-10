import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FilesService {

  constructor(
    protected http: HttpClient
  ) { }

  upload( file: File, id: string ) {

    const url = API_URL.concat( '/upload/tasks');

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('attached', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve( JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };

      const token = localStorage.getItem('token');

      xhr.open('PUT', url + '/' + id + '?token=' + token, true);
      xhr.send(formData);

    });

  }

  download(fileName: string) {
    const url = API_URL.concat('/download/tasks');
    return this.http.get(url + '/' + fileName, {responseType: 'blob' });
  }
}
