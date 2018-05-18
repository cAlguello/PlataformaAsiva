import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs/Observable';
declare var $: any;
import { dataEmpresaModal } from '../entidades/dataEmpresaModal';
import { DatePipe } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize/dist/materialize-module';


import { ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscadorComponent implements OnInit {
  fecha: any;
  estado: any;
  public host: any;
  EmpresaModal: dataEmpresaModal = new dataEmpresaModal(null, null, null, null, null, null, null, null, null);
  dataVista: Observable<Array<any>>;
  Text: string = "Description Here....";
  /*
  dataServicio: Observable<Array<any>>;
  dataEmpresa: Empresa[];
  dataGiro: Observable<Array<any>>;
  dataAreaGiro: Observable<Array<any>>;
  dataGiroEmpresa: Observable<Array<any>>;
  dataVista: giroDeEmpresa[];
  */
  dataConsulta = {
    usuario_id: '',
    empresa_id_empresa: '',
    fecha_consulta: '',
    estado: ''
  }

  constructor(private service: ServicesService, private dateFilter: DatePipe) {
  //this.host = 'http://127.0.0.1:9000';
  this.host = 'http://apiasiva.hopto.org:9000';
    $(document).ready(function () {
      $('.tooltipped').tooltip({ delay: 50 });
      //$('.modal').modal();      
      //



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
          $(".switch").find("input[type=checkbox]").prop('checked', false);


        } // Callback for Modal close
      }
      );


      //

      $(".switch").on("click", function () {

        var status = $(this).find("input[type=checkbox]").prop('checked');
        console.log(status);
        /*if(status){
         this.estado=status;
         console.log(this.estado);
        }*/


      });

    });

    //this.dataServicio = service.getServicios();
    this.dataVista = service.fetchData();
    // this.dataGiro = service.getGiros();
    //this.dataAreaGiro = service.getAreaGiros();
    //this.dataGiroEmpresa = service.getGirosEmpresas();
    /*
        $(document).ready(function () {
          $('.modal').modal({
            ready: function (modal, trigger) {
              var idModal = trigger.attr('id');
              $(function () {
                $.ajax({
                  type: 'GET',
                  url: 'http://127.0.0.1:9000/empresaController/' + idModal,
                  success: function (response) {
                    var EmpresaArray = response;
                    modal.find('#trigger-id').text(trigger.attr('id'));
                    modal.find('#trigger-data-nombre_empresa').text(EmpresaArray.nombre_empresa);
                    modal.find('#trigger-data-direccion_empresa').text(EmpresaArray.direccion_empresa);
                    modal.find('#trigger-data-fono_empresa').text(EmpresaArray.fono_empresa);
                    modal.find('#trigger-data-mail_empresa').text(EmpresaArray.mail_empresa);
                  }
                });
              });
            }
          });
        });
        //
    */
    $(document).ready(function () {
      //Autocomplete
      $(function () {
        $.ajax({
          type: 'GET',
          url: 'http://apiasiva.hopto.org:9000/fetchData',
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
                //this.dataVista.push(this.dataVista.pop());

                /* val = val.substring(0,val.length -1)              
                 $('input.autocomplete').val(val);*/
                 
 

                // Callback function when value is autcompleted.
              },
              minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
              //change: function (event, ui) { console.log(event); }
            });
          }
        });
      });
    });


  }
  ngOnInit() {
  }

  sendItem(val, e) {
    if (e.isTrigger != undefined) {
      console.log(val);
    }
  }
  onCheckBox(event: any) {
    this.estado = event.checked;
    console.log(this.estado);
  }
  setEmpresaModal(Empresa: any) {
    //console.log(Empresa);
    this.EmpresaModal = Empresa;
  }
  /*
  ingresaUsuario() {
    this.service.addUser(this.localUser).subscribe(val => { console.log(val) }, error => { console.log(error) });
    console.log(this.localUser);
  }

  */
  addConsulta(Empresa: any) {
    //this.fecha = this.dateFilter.transform(new Date(), 'yy-MM-dd');
    //console.log(this.fecha);
    // $(#idCheckBox).prop('clicked',false);
    this.dataConsulta.empresa_id_empresa = Empresa.id_empresa;
    this.dataConsulta.fecha_consulta = this.dateFilter.transform(new Date(), 'yy-MM-dd');
    console.log(this.dataConsulta.fecha_consulta);
    this.dataConsulta.usuario_id = sessionStorage.getItem('id');
    this.dataConsulta.estado = this.estado;
    this.service.addConsulta(this.dataConsulta).subscribe(val => { console.log(val) }, error => { console.log(error) });
    console.log("INTENTO DE INGRESO CONSULTA")
    console.log(this.dataConsulta)
  }

}



