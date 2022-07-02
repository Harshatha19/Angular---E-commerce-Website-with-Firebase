import { Product } from "./product";
import { shoppingCartItem } from "./shoppingCartItem";

export class shoppingCart{ 
    items: shoppingCartItem[]= [];

constructor(public itemsMap: {[productId: string]: shoppingCartItem} ){
    for(let productId in itemsMap){
        let item  = itemsMap[productId];
        this.items.push(new shoppingCartItem(item.product, item.quantity));
    }
    
}


get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) {
        count = count + this.itemsMap[productId].quantity;
    }
    return count;
}

get TotalPrice(){
    let sum = 0;
    for(let productId in this.items)
    sum += this.items[productId].totalPrice;

    return sum;
}

getQuantity(product: Product){
  
    let item =this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}