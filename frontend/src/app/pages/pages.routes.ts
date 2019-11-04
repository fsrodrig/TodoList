import { Routes, RouterModule } from '@angular/router';
import {
    PagesComponent,
    TaskComponent,
    TaskNewComponent
} from './pages.index';
import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            // TASKS
            { path: 'task', component: TaskComponent, data: { titulo: 'Tasks' } },
            { path: 'task/new', component: TaskNewComponent, data: { titulo: 'Tasks', subtitulo: 'Nuevo task' } },
            { path: '', redirectTo: '/task', pathMatch: 'full' }
        ]
     }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
