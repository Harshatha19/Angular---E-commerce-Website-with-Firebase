import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { shoppingCart } from '../models/shoppingCart';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
   return this.db.list('/shopping-carts').push({
  dateCreated: new Date().getTime()
   })
}

async getCart(): Promise<Observable<shoppingCart>> {
  let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges()
    .pipe(
      map((x: any) => {
        const items = x.payload.val().items;
        return new shoppingCart(items);
      })
    )
}

private async getOrCreateCartId(): Promise<string> {         //to create a cartid or acceess the cartid 
  let cartId=localStorage.getItem('cartId');
  if(cartId) return cartId;
  
  let result = await this.create();      //here we call create method to create a cartid and store it in local storage
  localStorage.setItem('cartId',result.key)
  return result.key;
  
}

async addToCart(product) {
  const cartId = await this.getOrCreateCartId();
  const item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
  item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
    console.log(i);
    if (i.payload.val()) {
      item.update({ product:product, quantity: i.payload.val().quantity + 1 });
    } else {
      item.set({ product:product, quantity: 1 });        
    }
  }); 
}

async removeCartItem(product){
  const cartId = await this.getOrCreateCartId();
  const item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
  item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
    console.log(i);
    if (i.payload.val()) {
      item.update({ product:product, quantity: i.payload.val().quantity - 1 });
    } else {
      item.set({ product:product, quantity: 1 });        
    }
  });
}
}

