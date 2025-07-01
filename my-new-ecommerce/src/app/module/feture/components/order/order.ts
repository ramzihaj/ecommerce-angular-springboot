import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { OrderCard } from "./order-card/order-card";
import { Router } from '@angular/router'; // Added Router
import { RouterModule } from '@angular/router'; // Added RouterModule

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, MatCheckboxModule, OrderCard, MatDividerModule, NgIf, RouterModule], // Added RouterModule
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {
  orderFilter = [
    { value: "on_the_way", label: "On The Way" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "returned", label: "Returned" },
  ];
  orders = [[1, 1], [1, 1, 1]];

  constructor(private router: Router) {}

  navigateToOrderDetails(id: number) {
    this.router.navigate([`/order/${id}`]); // Fixed string interpolation
    console.log('Navigating to order details for ID:', id);
  }
}
