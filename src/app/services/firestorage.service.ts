import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor( public fireStorage : AngularFireStorage ) { }

  uploadImage(){
    return new Promise( resolve => {

      setTimeout(() => {
        resolve(true);
        console.log('Responde la promesa');
        return;
      }, 2000);

    } );
  }
}
