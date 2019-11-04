import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Components
import {
  PagesComponent,
  TaskComponent,
  TaskNewComponent
} from './pages.index';
import { HeaderComponent } from '../shared/header/header.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    TaskComponent,
    TaskNewComponent
  ],
  imports: [
    PAGES_ROUTES,
    CommonModule
  ]
})
export class PagesModule { }
