import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { API_URL } from './config';

export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) && !(API_URL && request.url.startsWith(API_URL)))) {
            return next.handle(request);
        }

        const token = localStorage.getItem('token');
        if (!!token) {
            request = request.clone({
                setParams: {
                    token
                }
            });
        }
        return next.handle(request);
    }
}
