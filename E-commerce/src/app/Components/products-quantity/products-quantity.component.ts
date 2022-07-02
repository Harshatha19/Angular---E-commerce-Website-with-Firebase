import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products-quantity',
  templateUrl: './products-quantity.component.html',
  styleUrls: ['./products-quantity.component.css']
})
export class ProductsQuantityComponent  {
  @Input('product') product: Product
  @Input('shopping-cart') shoppingCart;
  constructor(private shoppingcartservice: ShoppingCartService) { }
  
    addToCart(product: Product){ //Add to cart functionality
      this.shoppingcartservice.addToCart(product); 
    }
  
  
    removeFromCart(){
  this.shoppingcartservice.removeCartItem(this.product);
    }
  

}
