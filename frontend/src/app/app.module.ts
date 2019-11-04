import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './config/auth.interceptor';
import { AuthExpiredInterceptor } from './config/auth-expired.interceptor';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';

// Modules
import { PagesModule } from './pages/pages.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { RegisterComponent } from './core/register/register.component';
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
    ServiceModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
