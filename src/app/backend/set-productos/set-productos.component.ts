import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Producto } from '../../models';
import { FirestorageService } from 'src/app/services/firestorage.service';

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

  loading : any;

  newImage = '';

  constructor( public menucontroller : MenuController,
               public firestoreService : FirestoreService,
               public loadingController: LoadingController,
               public toastController: ToastController,
               public alertController: AlertController,
               public firestorageService : FirestorageService ) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu() {
    this.menucontroller.toggle('principal');
  }

  guardarProducto(){
    this.presentLoading();
    this.firestoreService.createDoc(this.newProducto,this.path,this.newProducto.id).then( res => {
      this.loading.dismiss();
      this.presentToast('Guardado con Exito');
    } ).catch( error => {
      this.presentToast('No se pudo Guardar');
    } );
  }

  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res;
      });
  }

  async deleteProducto(producto : Producto){

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Seguro desea <strong>Eliminar</strong> este Producto',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
              this.presentToast('Eliminado con Exito');
              //this.alertController.dismiss();
            } ).catch( error => {
              this.presentToast('No se pudo Eliminar');
            } );
          }
        }
      ]
    });

    await alert.present();
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando',      
    });
    await this.loading.present();
  }

  async presentToast( msg : string ) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

   async newImageUpload( event : any){
    // if (event.target.files && event.target.files[0]){
    //   const reader = new FileReader();
    //   reader.onload = ( (image) => {
    //     this.newImage = image.target.result as string;
    //   } );
    //   reader.readAsDataURL(event.target.files[0]);
    // }

    const path = 'productos';
    const name = 'prueba';
    const file = event.target.files[0];
    const res = await this.firestorageService.uploadImage(file, path, name);

  }

}
