import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor(public menucontroller : MenuController) { }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }

}
