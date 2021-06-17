import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from 'src/app/models';

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

  constructor(public menucontroller : MenuController) { }

  ngOnInit() {}

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


  registrarse(){
    
  }

}
