import { Component } from '@angular/core';
import { StarRating } from '../../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-product-review-card',
  standalone: true,
  imports: [StarRating],
  templateUrl: './product-review-card.html',
  styleUrl: './product-review-card.css'
})
export class ProductReviewCard {
  reviews = [1, 1, 1];


}
