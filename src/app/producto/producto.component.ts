import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  dataProductosEmpresa: Observable<Array<any>>;
  public host: any;
  constructor(private ref: ChangeDetectorRef, private router: Router, private _fb: FormBuilder, private service: ServicesService) {
    //this.host = 'http://127.0.0.1:9000';
    this.host = 'http://apiasiva.hopto.org:9000';

    $(document).ready(function () {
      $(".button-collapse").sideNav();
      $('.sidenav').sidenav();
    });
   
    $(document).ready(function () {
      //Autocomplete
      $(function () {
        $.ajax({
          type: 'GET',
          url: 'http://apiasiva.hopto.org:9000/fetchProductos',
          success: function (response) {
            var ProductoArray = response;
            var dataProducto = {};
            for (var i = 0; i < ProductoArray.length; i++) {
              // console.log(EmpresaArray[i].nombre_giro);
              dataProducto[ProductoArray[i].nombre_producto] = null;
            }
            $('input.autocomplete').autocomplete({
              data: dataProducto,
              limit: 6, // The max amount of results that can be shown at once. Default: Infinity.

              onAutocomplete: function (val) {
              },
              minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
              //change: function (event, ui) { console.log(event); }
            });
          }
        });
      });
    });

    this.dataProductosEmpresa = service.getAllProductos();
  }

  ngOnInit() {
    console.log(this.dataProductosEmpresa);
  }

}
