import { Routes, RouterModule } from '@angular/router';
import {
    PagesComponent,
    TaskComponent,
    TaskNewComponent
} from './pages.index';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { LoginGuard } from '../services/service.index';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            // TASKS
            { path: 'task', component: TaskComponent, data: { titulo: 'Tareas' } },
            { path: 'task/new', component: TaskNewComponent, data: { titulo: 'Tareas', subtitulo: 'Nueva Tarea' } },
            { path: '', redirectTo: '/task', pathMatch: 'full' }
        ]
     },
     { path: '**', component: PageNotFoundComponent}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
