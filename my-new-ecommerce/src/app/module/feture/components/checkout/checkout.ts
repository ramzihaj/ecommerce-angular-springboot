import { Component } from '@angular/core';
import { AddressForm } from './address-form/address-form';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [AddressForm],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

}
