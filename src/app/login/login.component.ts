import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [AuthService]
})
export class LoginComponent implements OnInit {
  dataUser: Observable<any>;

  localUser = {
    username: '',
    password: ''
  }
  constructor(private router: Router, private service: ServicesService) {
  }

  ngOnInit() {
  }

  limpiaCampos() {
    this.localUser.username = '';
    this.localUser.password = '';
  }

  ingresaUsuario() {
    this.service.addUser(this.localUser).subscribe(val => { console.log(val) }, error => { console.log(error) });
    console.log(this.localUser);
  }

  irPerfil() {

    // this.dataUser= this.service.getUser(this.localUser.username);
    //console.log(this.dataUser);
    this.service.getUser(this.localUser.username).subscribe(val => {
      if (val != null) {
        if (this.localUser.password == val.password) {
          console.log(val);
          sessionStorage.setItem('id', val.id);
          if (val.password == 'admin') {
            this.router.navigateByUrl("admin");
          }
          else {
            this.router.navigateByUrl("perfil");

          }
        }
      }
      else {
        console.log("error");
      }

    });
  }



  /* constructor(private _service:AuthService, private _router: Router) {
       
   }
   
   login() {
       this._service.loginfn(this.localUser).then((res) => {
           if(res)
           this._router.navigate(['Dashboard']);
           else
           console.log(res);
       })
   }
   
   clearfields() {
       this.localUser.username = '';
       this.localUser.password = '';
   }
   
   
}
*/
}