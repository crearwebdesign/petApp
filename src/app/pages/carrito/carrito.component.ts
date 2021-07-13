import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Pedido } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  pedido : Pedido;
  constructor(public menucontroller: MenuController,
             public firestoreService: FirestoreService,
             public carritoService : CarritoService) { 
             this.loadPedido();
             }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }
  loadPedido(){
    this.pedido = this.carritoService.getCarrito();
  };
}
