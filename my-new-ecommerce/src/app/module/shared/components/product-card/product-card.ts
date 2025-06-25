import { Component, Input } from '@angular/core';
import {Router } from '@angular/router';
@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  @Input() product: any;
  constructor(private router: Router) {
  }
  navigate() {
    this.router.navigate(['/product-details/${5}'])
  }
}
