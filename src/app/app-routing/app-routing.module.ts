import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { ConsultasComponent } from '../consultas/consultas.component';
import { AdminComponent } from '../admin/admin.component';
import { ProductoComponent } from '../producto/producto.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'buscador', component: BuscadorComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'producto', component: ProductoComponent },
    { path: 'consultas', component: ConsultasComponent },
    { path: '**', component: LoginComponent }
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);