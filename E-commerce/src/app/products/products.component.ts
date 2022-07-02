import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
 
 
  
  category: string
  subscription: Subscription;
filterProducts: Product[]=[];
  cart: any;

  constructor(private productservice: ProductService, 
    route:ActivatedRoute, 
    private shoppingcartservice: ShoppingCartService) {

      

    this.subscription = productservice //to get categories and filter on products page 
      .getAll()
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const key = action.payload.key;
            const data = { key, ...(action.payload.val() as Product) };
 
            return data;
          })
        )
      )
      
     .subscribe((products) => {
       this.products = products;

       route.queryParamMap.subscribe(params => { 
this.category = params.get('category'); 
this.filterProducts = (this.category) ?
        this.products.filter( p => p.category === this.category) : 
        this.products;
       });
      });
    
}

ngOnDestroy() {
    this.subscription.unsubscribe();
  }


async ngOnInit() {
  this.subscription = (await this.shoppingcartservice.getCart())
  .subscribe(cart => this.cart = cart);
}
}
