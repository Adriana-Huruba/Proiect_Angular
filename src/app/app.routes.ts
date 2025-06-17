import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadComponent: () => import('./features/login-page/login-page.component').then(m => m.LoginPageComponent) },
    { path: 'register', loadComponent: () => import('./features/register-page/register-page.component').then(m => m.RegisterPageComponent) },
    { path: 'movies-table', loadComponent: () => import('./features/movies-table/movies-table.component').then(m => m.MoviesTableComponent) }
];
