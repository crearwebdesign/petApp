import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Pedido } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit, OnDestroy {

  pedido : Pedido;
  carritoSubscriber : Subscription;
  constructor(public menucontroller: MenuController,
             public firestoreService: FirestoreService,
             public carritoService : CarritoService) { 
             this.initCarrito();
             this.loadPedido();
             }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('ngOnDestroy() Carrito component');
    if (this.carritoSubscriber){
      this.carritoSubscriber.unsubscribe();
    }
  }

  openMenu() {
    this.menucontroller.toggle('principal');
  }
  loadPedido(){
    this.carritoSubscriber = this.carritoService.getCarrito().subscribe( res => {
      this.pedido = res;
    })
  };

  initCarrito(){
    this.pedido = {
    id : '',
    cliente : null,
    productos : [],
    precioTotal : null,
    estado : 'enviado',
    fecha : new Date(),
    valoracion : null
    }
  }

}
