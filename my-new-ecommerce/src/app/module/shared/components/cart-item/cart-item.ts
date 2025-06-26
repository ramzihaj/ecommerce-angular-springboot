import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-cart-item',
  imports: [MatIcon],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItem {

   quantity: number = 1;

  updateCartItem(change: number) {
    this.quantity = Math.max(1, this.quantity + change); // Prevent going below 1
  }

  removeCartItem() {
    console.log('Item removed');
    // Add removal logic here
  }
}
