import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public totalEmpresas: any;
  public totalContactos: any;
  public totalProductos: any;

  constructor(private router: Router, private service: ServicesService) {
    this.service.getTotalEmpresas().subscribe(val=>{
      this.totalEmpresas=val;
      console.log(val);
    });

    this.service.getTotalConsultas().subscribe(val=>{
      this.totalContactos=val;
      console.log(val);
    });

    this.service.contarProductos().subscribe(val=>{
      this.totalProductos=val;
    })
   }

  ngOnInit() {
  }

  irLogin() {
    this.router.navigateByUrl("login");
  }

}
