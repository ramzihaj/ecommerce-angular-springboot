import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CartItem } from "../../../shared/components/cart-item/cart-item";
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [AddressCard, CartItem,NgFor,NgIf,MatDivider],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

  products = [1, 1, 1];
}
