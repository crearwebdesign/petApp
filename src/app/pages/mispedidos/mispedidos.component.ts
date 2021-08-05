import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestorageService } from '../../services/firestorage.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.scss'],
})
export class MispedidosComponent implements OnInit {

  constructor(public menucontroller: MenuController,
              public firestorageService:FirestorageService,
              public firebaseauthService:FirebaseauthService) { }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }

  changeSegment(ev : any){
    // console.log("changeSegment",ev.detail.value);
    const opc = ev.detail.value;
    if (opc==='culminados'){
        this.getPedidosCulminados();
    }
    if (opc==='nuevos'){
        this.getPedidosNuevos();
    }
  }

  getPedidosNuevos(){
    console.log("getPedidosNuevos()");
  }

  getPedidosCulminados(){
    console.log("getPedidosCulminados()");
  }

}
