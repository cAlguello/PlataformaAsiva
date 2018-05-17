import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
import "materialize-css";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ServicesService } from './services.service';
import { BuscadorFilterPipe } from './pipes/buscador-filter.pipe';
import { routing, appRoutingProviders} from './app-routing/app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactoComponent } from './contacto/contacto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BuscadorFilterPipe2 } from './pipes/buscador-filter.pipe.2';
import { ProductoComponent } from './producto/producto.component';
import { ProductoFilterPipe } from './pipes/producto-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuscadorComponent,
    PerfilComponent,
    AdminComponent,
    ConsultasComponent,
    MaterializeDirective,
    BuscadorFilterPipe,
    BuscadorFilterPipe2,
    ContactoComponent,
    ProductoComponent,
    ProductoFilterPipe
  ],
  imports: [
    BrowserModule,
    routing,    
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [appRoutingProviders, ServicesService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }