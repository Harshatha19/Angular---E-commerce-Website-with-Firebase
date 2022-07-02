import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shoppingCart } from '../models/shoppingCart';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$: Observable<shoppingCart>;
  constructor(private shoppingcartservice: ShoppingCartService) { }

  async ngOnInit() {
   this.cart$ = await this.shoppingcartservice.getCart();
  }

}
