import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if(this.cartItems.length > 0) {
      // find the itemn in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }


    if(alreadyExistsInCart) {
      // increment the quantity
      existingCartItem!.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += (currentCartItem.quantity * currentCartItem.unitPrice);
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, Quantity: ${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotal: ${subTotalPrice} `);
    }

    console.log(`Total Price: ${totalPriceValue.toFixed(2)}, Total Quantity: ${totalQuantityValue}`);

    console.log('------')
  }

  reduceQuantity(theCartItem: CartItem) {
    console.log('reducing quantity', theCartItem)
    theCartItem.quantity--;

    // if the quantity becomes zero, remove the item from the cart
    if(theCartItem.quantity <= 0) {
      this.removeFromCart(theCartItem);
    } else {
      // compute cart total price and total quantity
      this.computeCartTotals();
    }
  }
  removeFromCart(theCartItem: CartItem) {
    // find the index of the item in the cart and remove it
    const itemIndex: number = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    console.log('index ===>', itemIndex);

    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
       // compute cart total price and total quantity
      this.computeCartTotals();
    }
  }
}
