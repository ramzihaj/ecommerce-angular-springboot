import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductReviewCard } from './product-review-card/product-review-card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { femmeRobe } from '../../../../../Data/Femme/Robe/femmeRobe';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { StarRating } from '../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatRadioModule,FormsModule,ProductReviewCard,NgFor,MatProgressBarModule,ProductCard,StarRating],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  reviews = [1, 1, 1];
  SelectedSize: any;
  relatedProducts: any;
  ngOnInit() {
    this.relatedProducts = femmeRobe;
  }
  handleAddToCart() {
    console.log("selected size", this.SelectedSize);
  }
}
