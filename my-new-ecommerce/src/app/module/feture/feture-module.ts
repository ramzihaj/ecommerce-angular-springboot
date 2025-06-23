import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from './components/products/products';
import { HomeComponent } from './components/home/home.component';
import { ProductCard } from '../shared/components/product-card/product-card';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,Products,HomeComponent
  ]
})
export class FetureModule { }
