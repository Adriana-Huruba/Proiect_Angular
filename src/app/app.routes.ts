import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadComponent: () => import('./features/login-page/login-page.component').then(m => m.LoginPageComponent) },
    { path: 'register', loadComponent: () => import('./features/register-page/register-page.component').then(m => m.RegisterPageComponent) },
    {path: 'movies-table', canActivate:[authGuard()], loadComponent: () => import('./features/movies-table/movies-table.component').then(m => m.MoviesTableComponent) }
    //{ path: 'movies-table', loadComponent: () => import('./features/movies-table/movies-table.component').then(m => m.MoviesTableComponent) }
];
