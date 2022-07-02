import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { shoppingCart } from 'src/app/models/shoppingCart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent  {
@Input('product') product: Product
@Input('shopping-cart') shoppingCart: shoppingCart;


  constructor(private shoppingcartservice: ShoppingCartService) { }

  addToCart(product: Product){ //Add to cart functionality
    this.shoppingcartservice.addToCart(product); 
  }

  

}
