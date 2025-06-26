import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Added OnInit for ngOnInit
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductReviewCard } from './product-review-card/product-review-card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { femmeRobe } from '../../../../../Data/Femme/Robe/femmeRobe';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { StarRating } from '../../../shared/components/star-rating/star-rating';
import { Router, RouterModule } from '@angular/router'; // Added RouterModule

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatRadioModule, FormsModule, ProductReviewCard, NgFor, MatProgressBarModule, ProductCard, StarRating, RouterModule], // Added RouterModule
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit { // Added implements OnInit
  reviews = [1, 1, 1];
  SelectedSize: any;
  relatedProducts: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.relatedProducts = femmeRobe;
  }

  handleAddToCart() {
    console.log("selected size", this.SelectedSize);
    this.router.navigate(['cart']);
  }
}
