import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    protected loginService: LoginService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

}
