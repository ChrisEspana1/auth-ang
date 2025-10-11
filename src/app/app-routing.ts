import { RouterModule, Routes } from '@angular/router';
import { adminGuard, authGuard, publicGuard } from './core/guards';
import { NgModule } from '@angular/core';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForosComponent } from './pages/foros/foros.component';
import { CursoDetalleComponent } from './pages/curso-detalle/curso-detalle.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProvidersComponent } from './pages/admin/providers/providers.component';
import { CoursesComponent } from './pages/admin/courses/courses.component';
import { UsersComponent } from './pages/admin/users/users.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
   // loadComponent: () => import('./pages/home/home.component'),
    loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
   // loadComponent: () => import('./pages/home/home.component'),
    loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        loadComponent: () => import('./pages/auth/log-in/log-in.component'),
      },
    ],
  },
{ path: 'cursos',
canActivate: [authGuard],
component: CursosComponent
},
{ path: 'foros',
canActivate: [authGuard],
component: ForosComponent
},
{ path: 'curso/:id', 
  component: CursoDetalleComponent 
},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [adminGuard],
  children: [
      { path: 'users', component: UsersComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'providers', component: ProvidersComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRouting {}