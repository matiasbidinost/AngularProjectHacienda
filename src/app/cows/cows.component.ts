import { Component, OnInit } from '@angular/core';
import { Cow } from '../../utils/cow';
import { signal, computed, WritableSignal } from '@angular/core';
import { ApiCowsService } from '../services/api-productos.service';

@Component({
  selector: 'app-cows',
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.scss']
})
export class CowsComponent implements OnInit {
  cows: Cow[] = [];
  cart: WritableSignal<Cow[]> = signal([]); //inicializa un arr que "escuche" continuamente ante los cambios en el mismo
  totalQuantity = computed(() => this.cart().length); //algo parecido, cada vez que el carrito cambia se actualiza quantity
  finalPrice = computed(() => this.cart().reduce((sum, cow) => sum + cow.precio, 0));
  //Crea una señal que devuelve el precio total de las vacas en el carrito, recalculando automaticamente cuando el carrito cambia.

  constructor(private serviceApi: ApiCowsService) {}

  ngOnInit() {
    this.serviceApi.getData().subscribe((response: Cow[]) => {
      this.cows = response;
    });
  }

  updateCart(cow: Cow, action: string) {
    const newCart = [...this.cart()];
     //crea una copia del carrito actual y con this.cart() llama al getter WritableSignal que devuelve el arr actual de Cow
    if (action === 'upSell') {
      newCart.push(cow); 
    } else if (action === 'downSell') {
      const index = newCart.findIndex(c => c.id === cow.id); 
      // busca en el arr la vaca con el mismo id para realizar el downSell
      if (index !== -1) {
        newCart.splice(index, 1); 
        //eliminar la vaca del carrito en la posicion encontrada. Si index es -1 (lo q significa q la vaca no se encontró)
      }
    }
    this.cart.set(newCart);
  }

  purchase() {
    alert(`Compra exitosa! ${this.totalQuantity()} vacas por $${this.finalPrice()}`);
    this.cart.set([]); // Luego de comprar se debe quedar en vacio
  }
}
