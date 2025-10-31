import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadFeaturedProducts } from '../../store/actions/product.actions';
import { selectFeaturedProducts } from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <section class="text-center py-16 animate-fade-in">
        <h1 class="text-5xl font-bold text-gradient mb-4">
          Welcome to Modern E-Commerce
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Discover amazing products at great prices
        </p>
        <button class="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition">
          Shop Now
        </button>
      </section>

      <section class="py-16">
        <h2 class="text-3xl font-bold mb-8">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (product of featuredProducts$ | async; track product.id) {
            <div class="card-hover bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <h3 class="font-semibold mb-2">{{ product.name }}</h3>
              <p class="text-primary-600 font-bold">\${{ product.price }}</p>
            </div>
          } @empty {
            <div class="col-span-full text-center py-16 text-gray-500">
              No featured products yet
            </div>
          }
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  
  featuredProducts$ = this.store.select(selectFeaturedProducts);

  ngOnInit() {
    this.store.dispatch(loadFeaturedProducts());
  }
}
