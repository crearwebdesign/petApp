import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Producto } from '../../models';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  productos : Producto[] = [];

  newProducto : Producto;

  enableNewProducto = false;

  private path = 'productos/';

  constructor( public menucontroller : MenuController,
               public firestoreService : FirestoreService ) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu() {
    this.menucontroller.toggle('principal');
  }

  guardarProducto(){
    
    this.firestoreService.createDoc(this.newProducto,this.path,this.newProducto.id);
  }

  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res;
      });
  }

  deleteProducto(producto : Producto){
    this.firestoreService.deleteDoc(this.path, producto.id);
  }

  nuevo(){
    
    this.enableNewProducto = true;
    this.newProducto = {
    nombre : '',
    precioNormal : null,
    precioReducido : null,
    foto : '',
    id : this.firestoreService.getId(),
    fecha : new Date()
     };
  }

}
