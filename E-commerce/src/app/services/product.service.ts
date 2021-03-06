import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
   return this.db.list('/products').push(product);
  }
  
  getAll(){
    return this.db.list('/products');
      
  }

  getProduct(productId){
    return this.db.object('/products/' + productId).snapshotChanges();

  }

  updateProduct(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId){
return this.db.object('/products/' + productId).remove();
  }


}
