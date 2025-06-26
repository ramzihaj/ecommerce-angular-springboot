import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Added OnInit
import { AddressCard } from '../../../../shared/components/address-card/address-card';
import { MatDivider } from '@angular/material/divider';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Added ReactiveFormsModule
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [AddressCard, NgIf, MatDivider, NgFor, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule], // Added ReactiveFormsModule
  templateUrl: './address-form.html',
  styleUrl: './address-form.css'
})
export class AddressForm implements OnInit { // Added implements OnInit
  adresses = [1, 1, 1];
  myForm!: FormGroup; // Using non-null assertion operator (!), initialized in ngOnInit

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      ZipCode: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  handleCreateOrder(item: any) {
    console.log('Order created with address:', item);
    // Add order creation logic here
  }

  handleSubmit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      console.log('Form data:', formValue);
      // Add submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
