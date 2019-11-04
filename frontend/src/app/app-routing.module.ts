import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
