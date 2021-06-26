import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente : Cliente = {
    uid : '',
    email : '',
    nombre : '',
    celular : '',
    foto : '',
    referencia : '',
    ubicacion : '',
  }

  newFile : any;

  uid = '';

  ingresarEnable = false;

  subscriberUserInfo : Subscription;

  constructor(public menucontroller : MenuController,
              public firebaseauthService : FirebaseauthService,
              public firestorageService : FirestorageService,
              public firestoreService : FirestoreService) {

                this.firebaseauthService.stateAuth().subscribe(res=>{
                  if(res !== null){
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                  }else{
                    this.initCliente();
                  }
                });
               }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid)

  }

  initCliente(){
    this.uid = '';
    this.cliente = {
        uid : '',
        email : '',
        nombre : '',
        celular : '',
        foto : '',
        referencia : '',
        ubicacion : '',
    }
  }

  openMenu() {
    this.menucontroller.toggle('principal');
  }

  async newImageUpload( event : any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ( (image) => {
        this.cliente.foto = image.target.result as string;
      } );
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  async registrarse(){
        
    const credenciales = {
      email : this.cliente.email,
      password : this.cliente.celular,
    };
    console.log(credenciales);
    const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.password).catch(
      err => {console.log("error :"+ err)}
    );
    const uid = await this.firebaseauthService.getUid();
    this.cliente.uid = uid;
    console.log(uid);
 

    this.guardarUser();
  }


  

  async guardarUser() {
    const customer = this.cliente;
    const path = 'Clientes';
    const name = this.cliente.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      //this.cliente.foto = res;
      const dir = res;
      console.log(dir);
      customer.foto=dir;
    }
    this.firestoreService.createDoc(customer, path, customer.uid).then( res => {
        console.log('guardado con exito');
    }).catch( error => {
    });
  }


  salir(){
    this.firebaseauthService.logout();
    this.subscriberUserInfo.unsubscribe();
  }

  getUserInfo(uid : string){
    const path = 'Clientes';
    this.subscriberUserInfo = this.firestoreService.getDoc<Cliente>(path,uid).subscribe( res =>{
         this.cliente = res;
    } );
  }

  ingresar(){
    const credenciales = {
      email : this.cliente.email,
      password : this.cliente.celular,
    };
    this.firebaseauthService.login(credenciales.email,credenciales.password).then( res=> {
      console.log('Ingreso con Exito');
    });
  }

}
