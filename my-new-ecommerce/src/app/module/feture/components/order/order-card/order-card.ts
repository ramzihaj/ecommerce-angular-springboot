import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [], // No imports needed yet
  templateUrl: './order-card.html',
  styleUrl: './order-card.css'
})
export class OrderCard {
  @Input() order!: any; // Adjust type as needed based on your data structure
}
