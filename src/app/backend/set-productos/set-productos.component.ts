import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  constructor( public menucontroller : MenuController ) { }

  ngOnInit() {}

  openMenu() {
    this.menucontroller.toggle('principal');
  }

}
