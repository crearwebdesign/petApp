import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  uid = '';
  private path = 'productos/';
  articulos : Producto[] = [];
  constructor(public menucontroller: MenuController,
    public firestoreService : FirestoreService,
    public firebaseauthService: FirebaseauthService) {

    this.firebaseauthService.stateAuth().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.loadProductos();
      }
    });
    
  }

  ngOnInit() { }

  openMenu() {
    this.menucontroller.toggle('principal');
  }

  loadProductos(){
      this.firestoreService.getCollection<Producto>(this.path).subscribe( res =>{
        console.log(res);
        this.articulos = res;
      } );
  }

}
