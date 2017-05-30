import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Taxista } from '../taxista/taxista';
import { Usuario } from '../usuario/usuario';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public http:Http) {
    console.log('PETICION GET');
    this.http.get('http://taxi.camarena.tk/api/test/travel').map(res=>res.json()).subscribe(data=>{console.log(data)});
    console.log('FIN PETICION GET');
  }
  
  authTaxi(user, password){
    let data = {
      permission_number: user,
      password: password,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/driver/login',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          this.navCtrl.push(Taxista);
        }
    });
  }

  authUser(user, password){
    let data = {
      email: user,
      password: password,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/user/login',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        if(response.code==200){
          this.navCtrl.push(Usuario);
        }
    });
  }

  loginTaxista() {
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: data => {
          this.authTaxi(data.username,data.password);

        }
      },
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}

loginUsuario() {
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: data => {
          this.authUser(data.username,data.password);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}

/*CALANDO METODOS*/

crearViaje(user_id,latitud,longitud){
  let data = {
      user_id: user_id,
      latitud: latitud,
      longitud:longitud

    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/travel',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          this.navCtrl.push(Taxista);
        }
    });
}//crearViaje

updateViaje(driver_id,travel_id){
  let data = {
      driver_id:driver_id      
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.put('http://taxi.camarena.tk/api/test/travel/'+travel_id,data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          this.navCtrl.push(Taxista);
        }
    });
}//updateViaje

deleteViaje(travel_id){
    let headers = {'Content-Type': 'application/json'};
   // console.log(data);
    this.http.delete('http://taxi.camarena.tk/api/test/travel/'+travel_id,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          this.navCtrl.push(Taxista);
        }
    });
}//deleteViaje

showViaje(travel_id){
    let headers = {'Content-Type': 'application/json'};
   // console.log(data);
    this.http.get('http://taxi.camarena.tk/api/test/travel/'+travel_id,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          this.navCtrl.push(Taxista);
        }
    });
}//deleteViaje



}//class

