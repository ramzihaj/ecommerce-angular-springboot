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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatDividerModule, MatIconModule, MatCheckboxModule, NgFor, NgIf, FormsModule, MatRadioModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  filterData: any
  singleFilterData: any
  hommePantalon: any

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilterData;
    this.hommePantalon = hommePantalon;
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    console.log("query params", queryParams)
    const FilterValues = queryParams[sectionId] ? queryParams[sectionId].splite(",") : [];

    const valueIndex = FilterValues.indexOf(value);
    if (valueIndex !== -1) {
      FilterValues.splice(valueIndex, 1);
    }
    else {
      FilterValues.push(value);
    }
    if (FilterValues.length > 0) {
      queryParams[sectionId] = FilterValues.join(",")
    }
    else {
      delete queryParams[sectionId];
    }
    this.router.navigate([], { queryParams })
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    if (queryParams[sectionId] && queryParams[sectionId] !== value) {
      delete queryParams[sectionId];
    }
    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams });

   this.applyFilters(queryParams);
  }

  // Basic filter application method
  private applyFilters(queryParams: any) {
    this.hommePantalon = this.hommePantalon.filter((product: Products) => { // Typed 'product' as Product
      return Object.entries(queryParams).every(([key, value]) => {
        if (!value || key === 'page') return true;
        return product[key as keyof Products]?.toString() === value.toString();
      });
    });
  }
 
}
