import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from '../services/service.module';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Services
import { FilesService } from '../services/service.index';

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
    CommonModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FilesService
  ]
})
export class PagesModule { }
