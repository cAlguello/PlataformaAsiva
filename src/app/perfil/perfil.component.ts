import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { dataEmpresa } from '../entidades/dataEmpresa';
import { giroUnicoEmpresa } from '../entidades/giroUnicoEmpresa';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs/Observable';

import { mergeMap } from 'rxjs/operators';
declare var $: any;
//
import { ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js';
import { dataDetalleAdmin } from '../entidades/dataDetalleAdmin';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  chart10 = [];
  giroData: Observable<Array<any>>;

  modalDetalle: dataDetalleAdmin = new dataDetalleAdmin(null, null, null, null);

  public girosUnicos: any;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public data_nombre_empresa: any;
  public data_direccion_empresa: any;
  public data_fono_empresa: any;
  public data_mail_empresa: any;
  public dataVistaHanConcretado: Observable<Array<any>>;
  public dataProductosEmpresa: Observable<Array<any>>;
  public productoServicioEmpresa: any[] = [];
  public ordenesDeCompraEmpresa: any[] = [];
  public host: any;
  localRut = {
    rut: '',
    id_chilecompra: ''
  }
  public dataNegocioConcretado: Observable<Array<any>>;

  constructor(private ref: ChangeDetectorRef, private router: Router, private _fb: FormBuilder, private service: ServicesService) {
    this.giroData = service.getGiros();
    //this.host = 'http://127.0.0.1:9000';
    this.host = 'http://apiasiva.hopto.org:9000';

    $(document).ready(function () {
      $('.tooltipped').tooltip({ delay: 50 });
      $('.modal').modal();

      //chilecompra

      //chilecompra
    });

    $(document).ready(function () {
      //Autocomplete
      $(function () {
        $.ajax({
          type: 'GET',
          url: 'http://apiasiva.hopto.org:9000/giroController',
          success: function (response) {
            var EmpresaArray = response;
            var dataEmpresa = {};
            for (var i = 0; i < EmpresaArray.length; i++) {
              // console.log(EmpresaArray[i].nombre_giro);
              dataEmpresa[EmpresaArray[i].nombre_giro] = null; //countryArray[i].flag or null
              //console.log(dataEmpresa);
            }
            $('input.autocomplete').autocomplete({
              data: dataEmpresa,
              limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
              onAutocomplete: function (val) {
                // Callback function when value is autcompleted.
              },
              minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
          }
        });
      });
    });

  }

  dynamicColors = function () {
    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 200);
    var b = Math.floor(Math.random() * 200);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  informacionOrdenDeCompra() {

    //CHILECOMPRA
    this.service.getEmpresaChileCompra(this.localRut.rut).subscribe(val1 => {
      console.log("ID CHILECOMPRA");
      console.log(val1.listaEmpresas[0].CodigoEmpresa);
      this.localRut.id_chilecompra = val1.listaEmpresas[0].CodigoEmpresa;
      console.log(this.localRut);
      //ORDEN DE COMPRA
      this.service.getOrdenesDeCompraChileCompra(val1.listaEmpresas[0].CodigoEmpresa).subscribe(val2 => {
        console.log("ORDENES DE COMPRA CHILECOMPRA");
        for (var i = 0; i < val2.Listado.length; i++) {
          //console.log(val2.Listado[i].Codigo);
          this.ordenesDeCompraEmpresa.push(val2.Listado[i].Codigo);

        }
        console.log(this.ordenesDeCompraEmpresa);

        //DETALLE ORDEN DE COMPRA


        //  for (var f = 0; f < this.ordenesDeCompraEmpresa.length; f++) {
        for (var f = 0; f < 1; f++) {

          this.service.getDetalleOrdenDeCompraChileCompra(this.ordenesDeCompraEmpresa[f]).subscribe(val => {
            console.log("DATOS CHILECOMPRA");
            for (var i = 0; i < val.Listado.length; i++) {
              console.log(val);
              for (var e = 0; e < val.Listado[i].Items.Listado.length; e++) {
                console.log("PROCESANDO PRODUCTO " + e + " DE " + val.Listado[i].Items.Listado.length);
                this.productoServicioEmpresa.push(val.Listado[i].Items.Listado[e].Producto);
              }
            }
            console.log(this.productoServicioEmpresa);

            console.log(val.Listado[0].Items.Listado[0].Producto);
          });

        }
        //FIN DETALLE
      });
      //FIN ORDEN DE COMPRA

    });







    //CHILECOMPRA
  }

  formato_rut() {
    var sRut1 = this.localRut.rut;      //contador de para saber cuando insertar el . o la -
    var nPos = 0; //Guarda el rut invertido con los puntos y el guión agregado
    var sInvertido = ""; //Guarda el resultado final del rut como debe ser
    var sRut = "";
    for (var i = sRut1.length - 1; i = 0; i--) {
      sInvertido += sRut1.charAt(i);
      if (i == sRut1.length - 1)
        sInvertido += "-";
      else if (nPos == 3) {
        sInvertido += ".";
        nPos = 0;
      }
      nPos++;
    }
    for (var j = sInvertido.length - 1; j = 0; j--) {
      if (sInvertido.charAt(sInvertido.length - 1) != ".")
        sRut += sInvertido.charAt(j);
      else if (j != sInvertido.length - 1)
        sRut += sInvertido.charAt(j);
    }
    //Pasamos al campo el valor formateado
    this.localRut.rut = sRut.toUpperCase();
    console.log(this.localRut.rut);
  }

  ngOnInit() {


    this.setDetalleNegocioConcretado();
    //this.setNegocioConcretado();
    this.service.getConsulta(sessionStorage.getItem('id')).subscribe(val => {
      this.dataVistaHanConcretado = val;
    });
    this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
      this.dataNegocioConcretado = val;
      console.log(val);
    });
    this.service.getGirosUnicosEmpresa(sessionStorage.getItem('id')).subscribe(val => {

      this.ref.detectChanges();
      this.girosUnicos = val;
      console.log("GIROS UNICOS");
      console.log(this.girosUnicos);
    });

    this.service.getEmpresa(sessionStorage.getItem('id')).subscribe(val => {
      if (val != null) {
        console.log(val);
        sessionStorage.setItem('empresa', val.id_empresa);
        this.data_nombre_empresa = val.nombre_empresa;
        this.data_direccion_empresa = val.direccion_empresa;
        this.data_fono_empresa = val.fono_empresa;
        this.data_mail_empresa = val.mail_empresa;

        const empresa = {
          nombre_empresa: val.nombre_empresa,
          direccion_empresa: val.direccion_empresa,
          fono_empresa: val.fono_empresa,
          mail_empresa: val.mail_empresa
        };
        console.log(empresa);
        (<FormGroup>this.myForm)
          .setValue(empresa, { onlySelf: true });
      }
      else {
        console.log("error");
      }

    });
    /*
    public id_empresa: any,
            public nombre_empresa: any,
            public direccion_empresa: any,
            public fono_empresa: any,       
            public mail_empresa:any   
    */


    this.myForm = this._fb.group({
      nombre_empresa: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      direccion_empresa: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      fono_empresa: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      mail_empresa: ['', [<any>Validators.required, <any>Validators.minLength(1)]]
    });
  }

  save(model: dataEmpresa, isValid: boolean) {
    this.submitted = true; // set form submit to true
    model.usuario_id = sessionStorage.getItem('id');


    // check if model is valid
    // if valid, call API to save customer
    // console.log(model, isValid);
    this.service.addOrUpdateEmpresa(model).subscribe(val => { console.log(val) }, error => { console.log(error) });
    console.log(model);
    this.data_nombre_empresa = model.nombre_empresa;
    this.data_direccion_empresa = model.direccion_empresa;
    this.data_fono_empresa = model.fono_empresa;
    this.data_mail_empresa = model.mail_empresa;


  }

  setDetalleNegocioConcretado() {
    this.modalDetalle = new dataDetalleAdmin(null, null, null, null);
    var labelsUso = [], dataUso = [], coloRUso = [];
    this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
      this.dataNegocioConcretado = val;

      for (var i = 0; i < val.length; i++) {
        dataUso.push(val[i].total);
        labelsUso.push(val[i].nombre_empresa);
        coloRUso.push(this.dynamicColors());
      }
      console.log("TEST FINAL");
      console.log(dataUso);
      console.log(labelsUso);
      var pieChartContent = document.getElementById('pieChartContent2');
      pieChartContent.innerHTML = '&nbsp;';
      $('#pieChartContent2').append('<canvas id="pieChart2"><canvas>');

      var ctx = $("#pieChart2").get(0).getContext("2d");

      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labelsUso,
          datasets: [
            {
              label: labelsUso,
              backgroundColor: coloRUso,
              // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],

              borderColor: 'rgba(200, 200, 200, 0.75)',
              //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
              hoverBorderColor: 'rgba(200, 200, 200, 1)',
              data: dataUso
            }
          ]
        },
        options:
          {
            //cutoutPercentage: 30,


            pieceLabel: {
              render: 'value',
              fontSize: 20,
              fontStyle: 'bold',
              fontColor: '#fff',
              //arc: true,
              //position: 'outside'

            },
            //*/
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue / total) * 100) + 0.5);
                  return precentage + "%";
                }
              }
            }
            //
          }
        // options: options
      });


    });

  }

  setNegocioConcretado() {
    var labels2 = [], data2 = [], coloR = [];


    this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
      this.dataNegocioConcretado = val;

      for (var i = 0; i < val.length; i++) {
        data2.push(val[i].total);
        labels2.push(val[i].nombre_empresa);
        coloR.push(this.dynamicColors());
      }
      console.log("PRUEBAS PRUEBAS")
      console.log(val);
      console.log(labels2);
      console.log(data2);
      this.chart10 = new Chart('canvas10', {
        type: 'doughnut',
        data: {
          labels: labels2,
          datasets: [
            {
              label: labels2,
              backgroundColor: coloR,
              // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],

              borderColor: 'rgba(200, 200, 200, 0.75)',
              //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
              hoverBorderColor: 'rgba(200, 200, 200, 1)',
              data: data2
            }
          ]
        }, options:
          {
            //cutoutPercentage: 30,
            pieceLabel: {
              render: 'value',
              fontSize: 20,
              fontStyle: 'bold',
              fontColor: '#fff',
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue / total) * 100) + 0.5);
                  return precentage + "%";
                }
              }
            }
          }
      });


    });
  }

  setNegocio(consulta: any) {
    this.service.setConsultaNegocio(consulta.id_consulta).subscribe(val => { });
    this.service.getConsulta(sessionStorage.getItem('id')).subscribe(val => {
      this.dataVistaHanConcretado = val;

      this.setDetalleNegocioConcretado();
    });
    this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
      this.dataNegocioConcretado = val;

      this.setDetalleNegocioConcretado();
      console.log(val);
    });
  }

  addGiro(giro: giroUnicoEmpresa) {
    giro.empresa_id_empresa = sessionStorage.getItem('id');
    console.log(giro);
    this.service.addGiroEmpresa(giro).subscribe(val => {
      console.log(val);
      this.ref.detectChanges();
      this.girosUnicos = val;
      console.log("GIROS UNICOS");
      console.log(this.girosUnicos);
      //
      /* this.service.getGirosUnicosEmpresa(sessionStorage.getItem('id')).subscribe(val => {
         this.girosUnicos = val;
         this.ref.detectChanges();
         console.log(this.girosUnicos);
       });*/
      //
    }, error => {
      console.log(error);
      this.service.getGirosUnicosEmpresa(sessionStorage.getItem('id')).subscribe(val => {

        this.ref.detectChanges();
        this.girosUnicos = val;
        console.log("GIROS UNICOS");
        console.log(this.girosUnicos);
      });
    });
  }

  removeGiro(giro: giroUnicoEmpresa) {
    giro.empresa_id_empresa = sessionStorage.getItem('id');
    console.log(giro);
    this.service.removeGiroEmpresa(giro).subscribe(val => {
      console.log(val);


    }, error => {
      console.log(error);
      this.service.getGirosUnicosEmpresa(sessionStorage.getItem('id')).subscribe(val => {

        this.ref.detectChanges();
        this.girosUnicos = val;
        console.log("GIROS UNICOS");
        console.log(this.girosUnicos);
      });
    });
  }

  irBuscador() {
    this.router.navigateByUrl("buscador");
  }

  irConsultas() {
    this.router.navigateByUrl("consultas");
  }

  irTest() {
    this.router.navigateByUrl("testfilter");
  }

  irProducto() {
    this.router.navigateByUrl("producto")
  }

  cerrarSesion() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('empresa');
    this.router.navigateByUrl("");
  }


}
