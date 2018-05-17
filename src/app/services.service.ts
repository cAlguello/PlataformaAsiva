import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientJsonpModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { ResponseContentType } from '@angular/http';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ServicesService {
  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  public header: any;
  public host: any;
  isLoggedin: boolean;
  ticket = "2789F8F4-C9C3-4DA8-9DA2-1EF5A5A40F79"; //ticket de chilecompra para uso de la API


  //headers = new Headers({ 'Content-Type': 'application/json' });  
  //options = new RequestOptions({ headers: this.headers });

  constructor(private httpClient: HttpClient, private http: Http) {
    this.host = 'http://127.0.0.1:9000';
    this.header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', "method": "post" });
  }
  //
  getAllProductos(): Observable<any> {
    return this.http.get(this.host+'/fetchProductos')
      .map((res: Response) => res.json())
  }
  //TEST CHILECOMPRA

  getEmpresaChileCompra(rut): Observable<any> {
    return this.http.get('http://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=' + rut + '&ticket=' + this.ticket)
      .map((res: Response) => res.json())
  }

  getOrdenesDeCompraChileCompra(empresa): Observable<any> {
    return this.http.get('http://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=01012018&CodigoProveedor=' + empresa + '&ticket=' + 'F8537A18-6766-4DEF-9E59-426B4FEE2844')
      .map((res: Response) => res.json())
  }

  getDetalleOrdenDeCompraChileCompra(orden): Observable<any> {
    return this.http.get('http://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=' + orden + '&ticket=' + this.ticket)
      .map((res: Response) => res.json())
  }


  //TEST MULTIPLES SERVICES
  getEmpresaMasOrdenDeCompra(rut) {
    return Observable.forkJoin(
      this.http.get('http://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=' + rut + '&ticket=' + this.ticket).map((res: Response) => res.json()),
      this.http.get('/app/movies.json').map((res: Response) => res.json())
    )
  }
  //TEST MULTIPLES SERVICES

  //TEST CHILECOMPRA
  getGirosUnicosEmpresa(id): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/girosUnicosEmpresa/' + id)
      .map((res: Response) => res.json())
  }
  //ADMIN SERVICES
  getTodasConsultadasAdmin(): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/adminHanConsultadoController')
      .map((res: Response) => res.json())
  }

  getUsoPlataformaAdmin(): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/adminUsoDePlataformaController')
      .map((res: Response) => res.json())
  }

  getMasConsultadasAdmin(): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/adminHanSidoConsultadasController')
      .map((res: Response) => res.json())
  }
  getMasConcretadasAdmin(): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/adminMasHanConcretadoContactoController')
      .map((res: Response) => res.json())
  }


  //
  getMasConsultadas(id): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/masConsultadasController/' + id)
      .map((res: Response) => res.json())
  }

  getMasHanConsultado(id): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/hanConsultadoController/' + id)
      .map((res: Response) => res.json())
  }


  getContactosConcretados(id): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/estadoConsultaController/' + id)
      .map((res: Response) => res.json())
  }



  //
  addUser(user): Observable<any> {
    return this.httpClient.post("http://127.0.0.1:9000/authController", user, this.header);
  }


  addConsulta(consulta): Observable<any> {
    return this.httpClient.post("http://127.0.0.1:9000/consultaController", consulta, this.header);
  }

  addOrUpdateEmpresa(empresa): Observable<any> {
    return this.httpClient.post("http://127.0.0.1:9000/dataEmpresaController", empresa, this.header);
  }

  removeGiroEmpresa(giro): Observable<any> {
    return this.httpClient.post("http://127.0.0.1:9000/girosUnicosEmpresa", giro, this.header);
  }

  addGiroEmpresa(giro): Observable<any> {
    return this.httpClient.post("http://127.0.0.1:9000/giroController", giro, this.header);
  }

  //REVISAR NUEVOS

  setConsultaNegocio(consulta): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/estadoConsultaNegocioController/' + consulta)
      .map((res: Response) => res.json())
  }

  getNegocioConcretado(id): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/estadoNegocioController/' + id)
      .map((res: Response) => res.json())
  }


  //
  getConsulta(user): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/consultaController/' + user)
      .map((res: Response) => res.json())
  }


  getServicios(): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/servicioController")
      .map((res: Response) => res.json())
  }

  getUser(user): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/authController/' + user)
      .map((res: Response) => res.json())
  }
  getEmpresa(user): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/empresaController/" + user)
      .map((res: Response) => res.json())
  }

  getAllEmpresas(): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/dataEmpresaController")
      .map((res: Response) => res.json())
  }
  getGiros(): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/giroController")
      .map((res: Response) => res.json())
  }
  getAreaGiros(): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/areaGiroController")
      .map((res: Response) => res.json())
  }
  getGirosEmpresas(): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/giroEmpresaController")
      .map((res: Response) => res.json())
  }

  fetchData(): Observable<any> {
    return this.http.get("http://127.0.0.1:9000/fetchData")
      .map((res: Response) => res.json())
  }
  //
  /*
  loginfn(usercreds) {
    this.isLoggedin = false;
    var headers = new Headers();
    var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return new Promise((resolve) => {
      this.http.post('http://localhost:3333/authenticate', creds, { headers: headers }).subscribe((data) => {
        if (data.json().success) {
          window.localStorage.setItem('auth_key', data.json().token);
          this.isLoggedin = true;
        }
        resolve(this.isLoggedin)
      }
      )

    })
  }
  //*/

}

