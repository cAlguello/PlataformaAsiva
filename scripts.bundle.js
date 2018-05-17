
 /* $(document).ready(function () {
    //Autocomplete
    $(function () {
      $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:9000/fetchData',
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
*/
$(document).ready(function () {
  $('.parallax').parallax();
});

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
    

/*
$(document).ready(function() {
  $('.modal').modal({
    ready: function(modal, trigger) {
      var idModal = trigger.attr('id');
      $(function () {
        $.ajax({          
          type: 'GET',
          url: 'http://127.0.0.1:9000/empresaController/'+idModal,
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
*/