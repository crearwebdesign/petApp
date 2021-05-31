import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Productos } from '../../models';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  newProductos : Productos = {
    nombre : '',
    precioNormal : null,
    precioReducido : null,
    foto : '',
    id : '',
    fecha : null,
  };

  private path = 'productos/';

  constructor( public menucontroller : MenuController,
               public firestoreService : FirestoreService ) { }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }

  guardarProducto(){
    const id = this.firestoreService.getId();
    this.firestoreService.createDoc(this.newProductos,this.path,id);
  }

}
