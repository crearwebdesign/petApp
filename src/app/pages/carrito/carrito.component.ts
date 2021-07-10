import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  constructor(public menucontroller: MenuController,
             public firestoreService: FirestoreService) { }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }

}
