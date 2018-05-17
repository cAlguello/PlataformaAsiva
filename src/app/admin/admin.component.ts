import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Chart from 'chart.js';
import { dataDetalleAdmin } from '../entidades/dataDetalleAdmin';
import 'chart.piecelabel.js';
//import PieceLabel from 'Chart.PieceLabel.js';

declare var $: any;
//

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //myPieChart=null;
  chart = [];
  dataVistaMasUsoAdmin: Observable<Array<any>>;
  dataVistaMasHanConsultado: Observable<Array<any>>;

  dataVistaMasConsultadasAdmin: Observable<Array<any>>;
  dataVistaMasConsultadas: Observable<Array<any>>;
  
  dataVistaHanConcretadoAdmin: Observable<Array<any>>;
  dataVistaHanConcretado: Observable<Array<any>>;

  modalDetalle: dataDetalleAdmin = new dataDetalleAdmin(null, null, null,null);


  empresaData: Observable<Array<any>>;
  giroData: Observable<Array<any>>;
  areaGiroData: Observable<Array<any>>;
  public myFormGiro: FormGroup; // our model driven form
  public myFormAreaGiro: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private router: Router, private _fb: FormBuilder, private service: ServicesService) {
    this.myFormGiro = this._fb.group({
      nombre_giro: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      area_giro_id_area_giro: ['', [<any>Validators.required, <any>Validators.minLength(1)]]
    });

    this.myFormAreaGiro = this._fb.group({
      nombre_area_giro: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      id_area_giro: ['', [<any>Validators.required, <any>Validators.minLength(1)]]
    });

    this.giroData = service.getGiros();
    this.areaGiroData = service.getAreaGiros();
    this.empresaData = service.getAllEmpresas();
   // let cloti = this.giroData.filter(filter => filter.nombre_giro==2);

    $(document).ready(function () {

            
      $('.tooltipped').tooltip({ delay: 50 });
      //moda
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
          //alert("Ready");
          //console.log(modal, trigger);
        },
        complete: function () {

        } // Callback for Modal close
      }
      );
      //
      
    });



    $(document).ready(function () {
      $(function () {
        $.ajax({
          type: 'GET',
          url: 'http://127.0.0.1:9000/giroController',
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

      $('.tooltipped').tooltip({ delay: 50 });
      $('ul.tabs').tabs();

      //$(".tabs" ).css("background-color", '#cfd8dc ');
      // TAB Indicator/Underline Color
      //$(".tabs>.indicator").css("background-color", '#e53935');

      // TAB Text Color
      //$(".tabs>li>a").css("color", '#FFF');
    });

  }
  ngOnInit() {
    // this.setAdminConsultadas();
    this.setAdminUsoPlataforma();
    this.setAdminMasConsultadas();
    this.setAdminMasContactoConcretado();
  }

  cerrarSesion() {
    sessionStorage.removeItem('id');
    this.router.navigateByUrl("");
  }

 

  /*drawChart(objChart,data){
      if(this.myPieChart!=null){
          this.myPieChart.destroy();
      }
      // Get the context of the canvas element we want to select
      var ctx = objChart.getContext("2d");
      this.myPieChart = new Chart(ctx).Pie(data, {animateScale: true});
  }*/


  dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  /* setAdminConsultadas(){
     var labels3 = [], data3 = [], coloR = [];
     this.service.getTodasConsultadasAdmin().subscribe(val => {
       this.dataVistaMasHanConsultado = val;
 
       for (var i = 0; i < val.length; i++) {
         data3.push(val[i].total);
         labels3.push(val[i].empresa_consultada);
         coloR.push(this.dynamicColors());
       }
       console.log(val);
       console.log(labels3);
       console.log(data3);
       this.chart = new Chart('canvas4', {
         type: 'pie',
         data: {
           labels: labels3,
           datasets: [
             {
               label: labels3,
               backgroundColor: coloR,
               // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],
 
               borderColor: 'rgba(200, 200, 200, 0.75)',
               //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
               hoverBorderColor: 'rgba(200, 200, 200, 1)',
               data: data3
             }
           ]
         },
          options:
          { 
            cutoutPercentage: 30
         }
          
       });
 
 
     });
   }*/
  setDetalleConsultaHecha(Empresa: any) {
    this.modalDetalle= new dataDetalleAdmin(null, null, null,null); 

    this.modalDetalle.titulo = 'Empresas Consultadas';
    this.modalDetalle.nombre_empresa = Empresa.nombre_empresa;
    var nombreChart= Empresa.nombre_empresa;
    var labelsUso = [], dataUso = [], coloRUso = [];
    this.service.getMasConsultadas(Empresa.usuario_id_consulta).subscribe(val => {
      this.dataVistaMasHanConsultado = val;
      //this.modalDetalle.dataTable=val;

      for (var i = 0; i < val.length; i++) {
        dataUso.push(val[i].total);
        labelsUso.push(val[i].nombre_empresa);
        coloRUso.push(this.dynamicColors());
      }
      console.log(val);
      console.log(labelsUso);
      console.log(dataUso);

      var pieChartContent = document.getElementById('pieChartContent');
      pieChartContent.innerHTML = '&nbsp;';
      $('#pieChartContent').append('<canvas id="pieChart" width="300" height="300"><canvas>');
      
      var ctx = $("#pieChart").get(0).getContext("2d"); 
        
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
              fontColor: '#000',
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

  setDetalleMasConsultadas(Empresa: any) {
    this.modalDetalle= new dataDetalleAdmin(null, null, null,null); 

    this.modalDetalle.titulo = 'Empresas que han consultado';
    this.modalDetalle.nombre_empresa = Empresa.nombre_empresa;
    var nombreChart= Empresa.nombre_empresa;
    var labelsUso = [], dataUso = [], coloRUso = [];
    this.service.getMasHanConsultado(Empresa.empresa_id_empresa).subscribe(val => {
      this.dataVistaMasHanConsultado = val;
      console.log("DETALLE MAS CONSULTADAS");
      console.log(val);

      for (var i = 0; i < val.length; i++) {
        dataUso.push(val[i].total);
        labelsUso.push(val[i].nombre_empresa);
        coloRUso.push(this.dynamicColors());
      }

      var pieChartContent = document.getElementById('pieChartContent');
      pieChartContent.innerHTML = '&nbsp;';
      $('#pieChartContent').append('<canvas id="pieChart" width="300" height="300"><canvas>');
      
      var ctx = $("#pieChart").get(0).getContext("2d"); 
        
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
              fontColor: '#000',
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

  
  setDetalleMasConcretado(Empresa: any) {
    this.modalDetalle= new dataDetalleAdmin(null, null, null,null); 

    this.modalDetalle.titulo = 'Empresas que con las que han concretado contacto';
    this.modalDetalle.nombre_empresa = Empresa.nombre_empresa;
    var nombreChart= Empresa.nombre_empresa;
    var labelsUso = [], dataUso = [], coloRUso = [];
    this.service.getContactosConcretados(Empresa.id).subscribe(val => {
      this.dataVistaMasHanConsultado = val;
     

      for (var i = 0; i < val.length; i++) {
        dataUso.push(val[i].total);
        labelsUso.push(val[i].nombre_empresa);
        coloRUso.push(this.dynamicColors());
      }
     var pieChartContent = document.getElementById('pieChartContent');
      pieChartContent.innerHTML = '&nbsp;';
      $('#pieChartContent').append('<canvas id="pieChart"><canvas>');
      
      var ctx = $("#pieChart").get(0).getContext("2d"); 
        
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

  

  setAdminUsoPlataforma() {
    var labels = [], data = [], coloR2 = [];
    this.service.getUsoPlataformaAdmin().subscribe(val => {
      this.dataVistaMasUsoAdmin = val;
      for (var i = 0; i < val.length; i++) {
        data.push(val[i].total);
        labels.push(val[i].nombre_empresa);
        coloR2.push(this.dynamicColors());
      }
      console.log(val);
      console.log(labels);
      console.log(data);
      this.chart = new Chart('canvasUso', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: labels,
              backgroundColor: coloR2,
              // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],
              borderColor: 'rgba(200, 200, 200, 0.75)',
              //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
              hoverBorderColor: 'rgba(200, 200, 200, 1)',
              data: data
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

  setAdminMasConsultadas() {
    var labels = [], data = [], coloR2 = [];
    this.service.getMasConsultadasAdmin().subscribe(val => {
      this.dataVistaMasConsultadasAdmin = val;
      for (var i = 0; i < val.length; i++) {
        data.push(val[i].total);
        labels.push(val[i].nombre_empresa);
        coloR2.push(this.dynamicColors());
      }
      console.log(val);
      console.log(labels);
      console.log(data);
      this.chart = new Chart('canvasConsulta', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: labels,
              backgroundColor: coloR2,
              // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],
              borderColor: 'rgba(200, 200, 200, 0.75)',
              //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
              hoverBorderColor: 'rgba(200, 200, 200, 1)',
              data: data
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

  setAdminMasContactoConcretado() {
    var labels = [], data = [], coloR2 = [];
    this.service.getMasConcretadasAdmin().subscribe(val => {
      this.dataVistaHanConcretadoAdmin = val;
      for (var i = 0; i < val.length; i++) {
        data.push(val[i].total);
        labels.push(val[i].nombre_empresa);
        coloR2.push(this.dynamicColors());
      }
      console.log(val);
      console.log(labels);
      console.log(data);
      this.chart = new Chart('canvasConcretado', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: labels,
              backgroundColor: coloR2,
              // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],
              borderColor: 'rgba(200, 200, 200, 0.75)',
              //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
              hoverBorderColor: 'rgba(200, 200, 200, 1)',
              data: data
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
              fontColor: '#000',
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


  /*
  
    setContactoConcretado() {
      var labels3 = [], data3 = [], coloR = [];
      this.service.getContactosConcretados(sessionStorage.getItem('id')).subscribe(val => {
        this.dataVistaHanConcretado = val;
  
        for (var i = 0; i < val.length; i++) {
          data3.push(val[i].total);
          labels3.push(val[i].nombre_empresa);
          coloR.push(this.dynamicColors());
        }
        console.log(val);
        console.log(labels3);
        console.log(data3);
        this.chart3 = new Chart('canvas3', {
          type: 'pie',
          data: {
            labels: labels3,
            datasets: [
              {
                label: labels3,
                backgroundColor: coloR,
                // ['#2196f3','#b388ff', '#a7ffeb', '#ff9800', '#ffff00', '#ef5350'   ],
  
                borderColor: 'rgba(200, 200, 200, 0.75)',
                //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                hoverBorderColor: 'rgba(200, 200, 200, 1)',
                data: data3
              }
            ]
          },
          options:
            {
              cutoutPercentage: 30
            }
  
        });
  
  
      });
    }
  
  
  
  
  
  
    setMasConsultadas() {
  
    }
  
    setMasHanConsultado() {
      var labels2 = [], data2 = [], coloR = [];
      this.service.getMasHanConsultado(sessionStorage.getItem('empresa')).subscribe(val => {
        this.dataVistaMasHanConsultado = val;
  
        for (var i = 0; i < val.length; i++) {
          data2.push(val[i].total);
          labels2.push(val[i].nombre_empresa);
          coloR.push(this.dynamicColors());
        }
        console.log(val);
        console.log(labels2);
        console.log(data2);
        this.chart2 = new Chart('canvas2', {
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
          }
          // options: options
        });
  
  
      });
    }
  */

}

