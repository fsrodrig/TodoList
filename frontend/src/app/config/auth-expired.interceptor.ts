import { Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../services/service.index';

declare var swal: any;

export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        const loginService: LoginService = this.injector.get(LoginService);
                        if (err.status === 401) {
                            swal({
                                title: 'Acceso no autorizado',
                                text: 'No posee permisos para esta acción',
                                icon: 'error',
                                dangerMode: true,
                                buttons: {
                                    cancel: {
                                        text: 'Regresar',
                                        value: 'cancel',
                                        visible: true,
                                        className: '',
                                        closeModal: true,
                                    },
                                    logout: {
                                        text: 'Cambiar usuario',
                                        value: 'logout',
                                        visible: true,
                                        className: '',
                                        closeModal: true
                                    }
                                }
                            })
                            .then((value) => {
                                if (value === 'logout') {
                                    loginService.logout();
                                }
                            });
                        } else if (err.status === 403) {
                          swal('Error', err.message, 'error').then( () => loginService.logout());
                        }
                    }
                }
            )
        );
    }
}
