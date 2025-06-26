import { NgFor, NgIf } from '@angular/common'; // Added NgIf
import { Component } from '@angular/core';
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CartItem, NgIf, MatDividerModule], // Added NgIf
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cart = [1, 1, 1];

  constructor(private router: Router) { }
  navigateToCheckout() {
    this.router.navigate(["checkout"]);
  }
}
