import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { filters, singleFilterData } from './filtreData';
import {MatRadioModule} from '@angular/material/radio';
import { hommePantalon } from '../../../../../Data/Homme/Pantalon/hommePantalon';
import { ProductCard } from '../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule,MatDividerModule,MatIconModule,MatCheckboxModule,NgFor,NgIf,FormsModule,MatRadioModule,ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  filterData: any
  singleFilterData: any
  hommePantalon:any
  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilterData;
    this.hommePantalon = hommePantalon;
  }
}
