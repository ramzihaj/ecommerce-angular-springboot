import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-card',
  imports: [],
  templateUrl: './address-card.html',
  styleUrl: './address-card.css'
})
export class AddressCard {
  @Input() address: any;
}
