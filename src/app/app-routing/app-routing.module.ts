import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { ConsultasComponent } from '../consultas/consultas.component';
import { AdminComponent } from '../admin/admin.component';
import { ProductoComponent } from '../producto/producto.component';
import { authGuard } from '../entidades/authGuard';
import { HomeComponent } from '../home/home.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    component: PerfilComponent
  },
  {
    path: 'buscador',
    canActivate: [authGuard],
    component: BuscadorComponent
  },
  //  { path: 'admin', component: AdminComponent }, temporalmente deshabilitado
  {
    path: 'producto',
    canActivate: [authGuard],
    component: ProductoComponent
  },
  {
    path: 'consultas',
    canActivate: [authGuard],
    component: ConsultasComponent
  },
  { path: '**', component: HomeComponent }
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);