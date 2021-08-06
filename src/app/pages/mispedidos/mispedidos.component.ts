import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { Pedido } from 'src/app/models';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.scss'],
})
export class MispedidosComponent implements OnInit {

  nuevosSuscriber : Subscription;
  pedidosNuevos : Pedido[] = [];
  constructor(public menucontroller: MenuController,
              public firestoreService:FirestoreService,
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

  async getPedidosNuevos(){
    console.log("getPedidosNuevos()");
    const uid = await this.firebaseauthService.getUid();
    const path = 'Clientes/'+ uid + '/pedidos/';
    this.nuevosSuscriber = this.firestoreService.getCollection<Pedido>(path).subscribe( res => {
        if ( res.length){
            this.pedidosNuevos = res;
        }
    } );

  }

  getPedidosCulminados(){
    console.log("getPedidosCulminados()");
  }

}
