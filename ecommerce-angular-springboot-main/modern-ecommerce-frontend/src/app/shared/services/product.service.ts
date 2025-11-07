import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TunisiaProduct, MOCK_TUNISIA_PRODUCTS } from '../models/tunisia-product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private useMockData = environment.useMockData ?? true;
  
  /**
   * Récupère tous les produits
   */
  getAllProducts(): Observable<TunisiaProduct[]> {
    if (this.useMockData) {
      return of(MOCK_TUNISIA_PRODUCTS).pipe(delay(300));
    }
    return this.http.get<any>(`${this.apiUrl}/products`).pipe(
      map(response => {
        // L'API renvoie { success, message, data: { content: [], ... } }
        const products = response?.data?.content || [];
        return products.map((p: any) => this.mapBackendProduct(p));
      }),
      catchError(error => {
        console.warn('API error, falling back to mock data', error);
        return of(MOCK_TUNISIA_PRODUCTS);
      })
    );
  }

  /**
   * Mappe un produit du backend vers le modèle frontend
   */
  private mapBackendProduct(backendProduct: any): TunisiaProduct {
    return {
      id: backendProduct.id,
      name: backendProduct.name,
      description: backendProduct.description || '',
      price: backendProduct.price,
      discountPrice: backendProduct.discountPrice,
      stockQuantity: backendProduct.stockQuantity || 0,
      categoryId: backendProduct.categoryId || 0,
      categoryName: backendProduct.categoryName,
      brand: backendProduct.brand,
      sku: backendProduct.sku || '',
      imageUrl: backendProduct.imageUrls?.[0] || '',
      images: backendProduct.imageUrls || [],
      featured: backendProduct.isFeatured || false,
      newArrival: false,
      bestSeller: false,
      madeInTunisia: true,
      active: true,
      rating: backendProduct.averageRating,
      reviewCount: backendProduct.reviewCount
    };
  }

  /**
   * Récupère les produits en vedette
   */
  getFeaturedProducts(): Observable<TunisiaProduct[]> {
    if (this.useMockData) {
      const featured = MOCK_TUNISIA_PRODUCTS.filter(p => p.featured);
      return of(featured).pipe(delay(300));
    }
    return this.http.get<TunisiaProduct[]>(`${this.apiUrl}/products/featured`).pipe(
      catchError(() => {
        const featured = MOCK_TUNISIA_PRODUCTS.filter(p => p.featured);
        return of(featured);
      })
    );
  }

  /**
   * Récupère les best sellers
   */
  getBestSellers(): Observable<TunisiaProduct[]> {
    const bestSellers = MOCK_TUNISIA_PRODUCTS.filter(p => p.bestSeller);
    return of(bestSellers).pipe(delay(300));
  }

  /**
   * Récupère les nouveautés
   */
  getNewArrivals(): Observable<TunisiaProduct[]> {
    const newArrivals = MOCK_TUNISIA_PRODUCTS.filter(p => p.newArrival);
    return of(newArrivals).pipe(delay(300));
  }

  /**
   * Récupère les produits Made in Tunisia
   */
  getMadeInTunisia(): Observable<TunisiaProduct[]> {
    const madeInTN = MOCK_TUNISIA_PRODUCTS.filter(p => p.madeInTunisia);
    return of(madeInTN).pipe(delay(300));
  }

  /**
   * Récupère un produit par ID
   */
  getProductById(id: number): Observable<TunisiaProduct | undefined> {
    if (this.useMockData) {
      const product = MOCK_TUNISIA_PRODUCTS.find(p => p.id === id);
      return of(product).pipe(delay(300));
    }
    return this.http.get<any>(`${this.apiUrl}/products/${id}`).pipe(
      map(response => {
        const product = response?.data;
        return product ? this.mapBackendProduct(product) : undefined;
      }),
      catchError(() => {
        const product = MOCK_TUNISIA_PRODUCTS.find(p => p.id === id);
        return of(product);
      })
    );
  }

  /**
   * Récupère un produit par SKU
   */
  getProductBySku(sku: string): Observable<TunisiaProduct | undefined> {
    const product = MOCK_TUNISIA_PRODUCTS.find(p => p.sku === sku);
    return of(product).pipe(delay(300));
  }

  /**
   * Récupère les produits par catégorie
   */
  getProductsByCategory(categoryId: number): Observable<TunisiaProduct[]> {
    const products = MOCK_TUNISIA_PRODUCTS.filter(p => p.categoryId === categoryId);
    return of(products).pipe(delay(300));
  }

  /**
   * Recherche de produits
   */
  searchProducts(query: string): Observable<TunisiaProduct[]> {
    const lowerQuery = query.toLowerCase();
    const results = MOCK_TUNISIA_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.nameAr?.includes(query) ||
      p.descriptionAr?.includes(query) ||
      p.brand?.toLowerCase().includes(lowerQuery) ||
      p.categoryName?.toLowerCase().includes(lowerQuery)
    );
    return of(results).pipe(delay(300));
  }

  /**
   * Filtre les produits par prix
   */
  filterByPrice(minPrice: number, maxPrice: number): Observable<TunisiaProduct[]> {
    const filtered = MOCK_TUNISIA_PRODUCTS.filter(p => {
      const price = p.discountPrice || p.price;
      return price >= minPrice && price <= maxPrice;
    });
    return of(filtered).pipe(delay(300));
  }

  /**
   * Trie les produits
   */
  sortProducts(
    products: TunisiaProduct[], 
    sortBy: 'price-asc' | 'price-desc' | 'name' | 'newest' | 'rating'
  ): TunisiaProduct[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
      
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
      
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      case 'newest':
        return sorted.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      
      default:
        return sorted;
    }
  }

  /**
   * Calcule le prix final (avec réduction si applicable)
   */
  getFinalPrice(product: TunisiaProduct): number {
    return product.discountPrice && product.discountPrice < product.price 
      ? product.discountPrice 
      : product.price;
  }

  /**
   * Calcule le pourcentage de réduction
   */
  getDiscountPercentage(product: TunisiaProduct): number {
    if (!product.discountPrice || product.discountPrice >= product.price) {
      return 0;
    }
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }

  /**
   * Vérifie si un produit est en stock
   */
  isInStock(product: TunisiaProduct): boolean {
    return product.active && product.stockQuantity > 0;
  }

  /**
   * Récupère les produits similaires
   */
  getSimilarProducts(productId: number): Observable<TunisiaProduct[]> {
    const product = MOCK_TUNISIA_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      return of([]);
    }

    const similar = MOCK_TUNISIA_PRODUCTS.filter(p => 
      p.id !== productId &&
      p.categoryId === product.categoryId &&
      p.active
    ).slice(0, 4);

    return of(similar).pipe(delay(300));
  }
}
