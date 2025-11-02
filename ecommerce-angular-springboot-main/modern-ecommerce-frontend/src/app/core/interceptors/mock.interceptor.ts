import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { MOCK_PRODUCTS, MOCK_USERS, MOCK_CART, MOCK_ORDERS } from '../mocks/mock-data';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if mock mode is enabled (default to true if not set)
  let useMocks = localStorage.getItem('useMocks');
  if (useMocks === null) {
    // Enable mocks by default on first load
    localStorage.setItem('useMocks', 'true');
    useMocks = 'true';
  }
  
  if (useMocks !== 'true') {
    return next(req);
  }

  // Simulate network delay
  const simulateDelay = 500;

  // Mock API responses based on URL
  const url = req.url;

  // Products endpoints
  if (url.includes('/api/products') && req.method === 'GET') {
    if (url.includes('/featured')) {
      const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);
      return of(new HttpResponse({ 
        status: 200, 
        body: { data: featuredProducts }
      })).pipe(delay(simulateDelay));
    }
    
    if (url.match(/\/api\/products\/\d+$/)) {
      const id = parseInt(url.split('/').pop() || '0');
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      return of(new HttpResponse({ 
        status: 200, 
        body: { data: product }
      })).pipe(delay(simulateDelay));
    }
    
    return of(new HttpResponse({ 
      status: 200, 
      body: { 
        data: {
          content: MOCK_PRODUCTS,
          totalPages: 1,
          pageNumber: 0,
          totalElements: MOCK_PRODUCTS.length
        }
      }
    })).pipe(delay(simulateDelay));
  }

  // Cart endpoints
  if (url.includes('/api/cart') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_CART })).pipe(delay(simulateDelay));
  }

  // Orders endpoints
  if (url.includes('/api/orders') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_ORDERS })).pipe(delay(simulateDelay));
  }

  // Auth endpoints
  if (url.includes('/api/auth/login') && req.method === 'POST') {
    const mockResponse = {
      token: 'mock-jwt-token-123456789',
      user: MOCK_USERS[0]
    };
    return of(new HttpResponse({ status: 200, body: mockResponse })).pipe(delay(simulateDelay));
  }

  if (url.includes('/api/auth/register') && req.method === 'POST') {
    const body = req.body as any;
    const mockResponse = {
      token: 'mock-jwt-token-123456789',
      user: { ...body, id: Date.now() }
    };
    return of(new HttpResponse({ status: 201, body: mockResponse })).pipe(delay(simulateDelay));
  }

  // User profile
  if (url.includes('/api/users/me') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_USERS[0] })).pipe(delay(simulateDelay));
  }

  // If no mock matched, pass through to real API
  return next(req);
};
