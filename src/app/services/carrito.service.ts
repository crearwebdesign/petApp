import { Injectable } from '@angular/core';
import { Pedido, Producto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  private pedido : Pedido;

  constructor() { 
    this.loadCarrito();

  }

  loadCarrito(){

  }

  getCarrito(){
    return this.pedido;
  }

  addProducto(producto : Producto){

  }

removeProducto (producto : Producto){

}

realizarPedido(){

}

clearCarrito(){
  
}

}
