import { NgClass, NgIf, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-tracker',
  imports: [NgClass,NgIf,NgFor,MatIcon,MatDivider],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.css'
})
export class OrderTracker {

  @Input() activeStep: any;
  @Input() steps: any;

}
