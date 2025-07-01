import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AddressCard } from "../../../shared/components/address-card/address-card";
import { OrderCard } from "../order/order-card/order-card";
import { OrderTracker } from "../../../shared/components/order-tracker/order-tracker";


@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [AddressCard, OrderCard, NgFor, OrderTracker],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails {

  orders = [1, 1, 1];
  steps = [
    { id: 0, title: "PLACED", isCompleted: false },
    { id: 1, title: "CONFIRMED", isCompleted: false },
    { id: 2, title: "SHIPPED", isCompleted: false },
    { id: 3, title: "DELIVERED", isCompleted: false }


  ]
}
