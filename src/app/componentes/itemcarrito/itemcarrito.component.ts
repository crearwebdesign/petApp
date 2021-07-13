import { Component, Input, OnInit } from '@angular/core';
import { ProductoPedido } from 'src/app/models';

@Component({
  selector: 'app-itemcarrito',
  templateUrl: './itemcarrito.component.html',
  styleUrls: ['./itemcarrito.component.scss'],
})
export class ItemcarritoComponent implements OnInit {

  @Input()  productoPedido : ProductoPedido;
  constructor() { }

  ngOnInit() {}

}
