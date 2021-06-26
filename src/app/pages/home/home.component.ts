import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  uid = '';
  constructor( public menucontroller : MenuController,
    public firebaseauthService : FirebaseauthService ) { 
    this.firebaseauthService.stateAuth().subscribe(res=>{
      if(res !== null){
        this.uid = res.uid;
        
      }
    });
  }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }

}
