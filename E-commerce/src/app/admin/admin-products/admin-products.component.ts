import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[]; //from obersevable to product in an array to filter it later
  subscription: Subscription

  constructor(private productservice: ProductService) { 
   this.subscription = this.productservice.getAll()
      .snapshotChanges()
      .pipe(map(actions => actions.map(action =>{
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() as Product};
        return data;
      }))).subscribe(pr => this.products = this.filteredProducts = pr);
  
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
