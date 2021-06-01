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
    id : this.firestoreService.getId(),
    fecha : new Date()
  };

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
    
    this.firestoreService.createDoc(this.newProductos,this.path,this.newProductos.id);
  }

  getProductos(){
    this.firestoreService.getCollection(this.path).subscribe(res => {console.log(res)});
  }

}
