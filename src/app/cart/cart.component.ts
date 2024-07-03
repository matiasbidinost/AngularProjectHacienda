import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Cow } from '../../utils/cow';
import { ApiCowsService } from '../services/api-productos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() cow!: Cow; //defino el input
  //propiedad de salida. Este emisor de eventos se utiliza para enviar eventos al componente padre cuando ocurren acciones en el componente hijo.
  @Output() update = new EventEmitter<{ cow: Cow, action: string }>(); 
  //enlace con la api
  constructor(private serviceApi: ApiCowsService) {}

  ngOnInit() {}

  upSell() {
    if (this.cow.stock > 0) {
      this.cow.stock--;
      this.cow.vendidos++;
      this.update.emit({ cow: this.cow, action: 'upSell' }); //notifica al componente padre que se ha realizado una acción de "upSell" en una vaca específica.
    }
  }

  downSell() {
    if (this.cow.vendidos > 0) {
      this.cow.stock++;
      this.cow.vendidos--;
      this.update.emit({ cow: this.cow, action: 'downSell' });
    }
  }
}
