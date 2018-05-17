import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs/Observable';
import Chart from 'chart.js';
import { dataEmpresaModal } from '../entidades/dataEmpresaModal';
import { dataDetalleAdmin } from '../entidades/dataDetalleAdmin';

declare var $: any;
//
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  EmpresaModal: dataEmpresaModal = new dataEmpresaModal(null, null, null, null, null, null, null, null, null);

  modalDetalle: dataDetalleAdmin = new dataDetalleAdmin(null, null, null, null);

  chart = [];
  chart2 = [];
  chart3 = [];
  chart11 = []
  /* data = {
     datasets: [{
       data: [10, 20, 30]
     }],
 
     // These labels appear in the legend and in the tooltips when hovering different arcs
     labels: [
       'Red',
       'Yellow',
       'Blue'
     ]
   };*/
  dataVistaMasConsultadas: Observable<Array<any>>;
  dataVistaMasHanConsultado: Observable<Array<any>>;

  dataVistaHanConcretado: Observable<Array<any>>;
  dataVistaHanConcretado1: Observable<Array<any>>;
  dataNegocioConcretadoFinal: Observable<Array<any>>;
  constructor(private service: ServicesService) {


  }
  ngOnInit() {
    this.setMasConsultadas();
    this.setMasHanConsultado();
    this.setContactoConcretado();
    this.setDetalleNegocioConcretado();
    //this.setNegocioConcretado();
    this.service.getConsulta(sessionStorage.getItem('id')).subscribe(val => {
      this.dataVistaHanConcretado1 = val;
    });
    this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
      this.dataNegocioConcretadoFinal = val;
      console.log(val);
    });
     
  }


//
setDetalleNegocioConcretado() {
  this.modalDetalle = new dataDetalleAdmin(null, null, null, null);
  var labelsUso = [], dataUso = [], coloRUso = [];
  this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
    this.dataNegocioConcretadoFinal = val;

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
    this.dataNegocioConcretadoFinal = val;

    for (var i = 0; i < val.length; i++) {
      data2.push(val[i].total);
      labels2.push(val[i].nombre_empresa);
      coloR.push(this.dynamicColors());
    }
    console.log("PRUEBAS PRUEBAS")
    console.log(val);
    console.log(labels2);
    console.log(data2);
    this.chart11 = new Chart('canvas11', {
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
    this.dataVistaHanConcretado1 = val;

    this.setDetalleNegocioConcretado();
  });
  this.service.getNegocioConcretado(sessionStorage.getItem('id')).subscribe(val => {
    this.dataNegocioConcretadoFinal = val;

    this.setDetalleNegocioConcretado();
    console.log(val);
  });
}

//
  

  dynamicColors = function () {
    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 200);
    var b = Math.floor(Math.random() * 200);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  setEmpresaModal(Empresa: any) {
    this.EmpresaModal = Empresa;
  }

  setContactoConcretado(){
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






  setMasConsultadas(){
    var labels = [], data = [], coloR = [];
    this.service.getMasConsultadas(sessionStorage.getItem('id')).subscribe(val => {
      this.dataVistaMasConsultadas = val;

      for (var i = 0; i < val.length; i++) {
        data.push(val[i].total);
        labels.push(val[i].nombre_empresa);
        coloR.push(this.dynamicColors());
      }
      console.log(val);
      console.log(labels);
      console.log(data);
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: labels,
              backgroundColor: coloR,
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

  setMasHanConsultado(){
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
  
}

