# Modern E-Commerce Frontend - Angular 18

Modern, responsive e-commerce frontend built with Angular 18, TailwindCSS, Angular Material, and NgRx state management.

## 🚀 Features

### Core Features
- ✅ **Angular 18** with standalone components
- ✅ **NgRx** state management (Store, Effects, Devtools)
- ✅ **TailwindCSS** for modern, responsive UI
- ✅ **Angular Material** components
- ✅ **Dark/Light Mode** theme toggle
- ✅ **JWT Authentication** with interceptors
- ✅ **Lazy Loading** routes for optimal performance
- ✅ **Animations** (fade, slide, scale effects)

### User Features
- 🛍️ Product catalog with search and filters
- 🛒 Shopping cart with localStorage persistence
- 💳 Checkout process
- 👤 User authentication (login/register)
- 📦 Order management
- ⭐ Product reviews
- 🎨 Dark mode support
- 📱 Fully responsive design

### Admin Features
- 📊 Admin dashboard
- ➕ Product management (CRUD)
- 📋 Order management
- 👥 User management

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+
- Angular CLI 18+

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Install Angular CLI globally (if not installed)
npm install -g @angular/cli@18
```

## 🏃 Development

```bash
# Start development server
npm start
# or
ng serve

# Application will be available at http://localhost:4200
```

## 🏗️ Build

```bash
# Production build
npm run build
# or
ng build --configuration production

# Output will be in dist/ folder
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core module (singleton services, guards, interceptors)
│   │   ├── components/          # Shared layout components (navbar, footer)
│   │   ├── guards/              # Route guards (auth.guard.ts)
│   │   ├── interceptors/        # HTTP interceptors (auth, error)
│   │   └── services/            # Core services (api, theme)
│   │
│   ├── features/                # Feature modules (lazy-loaded)
│   │   ├── home/               # Home page
│   │   ├── auth/               # Authentication (login, register)
│   │   ├── product/            # Product catalog, details
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout process
│   │   ├── order/              # Order history
│   │   └── admin/              # Admin panel
│   │
│   ├── store/                   # NgRx state management
│   │   ├── actions/            # Action creators
│   │   ├── reducers/           # Reducers
│   │   ├── selectors/          # Selectors
│   │   └── effects/            # Side effects
│   │
│   ├── app.config.ts           # App configuration
│   ├── app.routes.ts           # Route definitions
│   └── app.component.ts        # Root component
│
├── environments/               # Environment configurations
├── assets/                     # Static assets
└── styles.css                  # Global styles with Tailwind
```

## 🎨 Styling

The app uses **TailwindCSS** with custom configurations:

### Theme Colors
- Primary: Blue shades (customizable in `tailwind.config.js`)
- Dark mode support via `class` strategy

### Custom CSS Classes
```css
.card-hover         /* Hover effect for cards */
.gradient-bg        /* Gradient background */
.text-gradient      /* Gradient text */
.transition-smooth  /* Smooth transitions */
```

## 🔐 Authentication

JWT-based authentication with automatic token refresh:

1. User logs in → receives JWT token
2. Token stored in localStorage
3. Auth interceptor adds token to all API requests
4. Auth guard protects authenticated routes

## 📡 State Management (NgRx)

### Store Structure
```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    loading: boolean,
    error: string | null
  },
  product: {
    products: Product[],
    featuredProducts: Product[],
    loading: boolean,
    error: string | null
  },
  cart: {
    items: CartItem[],
    total: number
  },
  order: {
    orders: Order[],
    loading: boolean,
    error: string | null
  }
}
```

### Usage Example
```typescript
// Component
constructor(private store: Store) {}

// Dispatch action
this.store.dispatch(ProductActions.loadProducts({ page: 0, size: 12 }));

// Select data
products$ = this.store.select(selectAllProducts);
```

## 🌐 API Integration

Base API URL configured in `environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  wsUrl: 'ws://localhost:8085/ws'
};
```

### API Service Usage
```typescript
// Inject service
constructor(private api: ApiService) {}

// GET request
this.api.get<Product[]>('/products', { page: 0, size: 10 });

// POST request
this.api.post<Order>('/orders', orderData);
```

## 🔄 Routing

Lazy-loaded feature modules for optimal performance:

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes') },
  { path: 'products', loadChildren: () => import('./features/product/product.routes') },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'orders', loadChildren: () => import('./features/order/order.routes'), canActivate: [authGuard] },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.routes'), canActivate: [authGuard] }
];
```

## 🎭 Animations

Custom animations defined in `tailwind.config.js`:

- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up effect
- `animate-slide-down` - Slide down effect
- `animate-scale-in` - Scale in effect

## 🌙 Dark Mode

Toggle dark mode via `ThemeService`:

```typescript
constructor(private themeService: ThemeService) {}

toggleTheme() {
  this.themeService.toggleTheme();
}

isDarkMode = this.themeService.isDarkMode;
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e
```

## 📦 Deployment

### Build for Production
```bash
ng build --configuration production
```

### Deploy to Netlify/Vercel
```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod
```

## 🔧 Configuration

### Angular.json
- TailwindCSS configured in build styles
- Lazy loading enabled
- Production optimizations

### TailwindCSS
- Custom theme colors
- Dark mode support
- Custom animations
- Purge unused CSS in production

## 📚 Key Dependencies

```json
{
  "@angular/core": "^18.2.13",
  "@angular/material": "^18.2.13",
  "@ngrx/store": "^18.1.1",
  "@ngrx/effects": "^18.1.1",
  "tailwindcss": "^3.4.17",
  "rxjs": "~7.8.0"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Environment Variables

Create `.env` file for sensitive data:

```env
API_URL=http://localhost:8080/api
WS_URL=ws://localhost:8085/ws
```

## 🐛 Troubleshooting

### Module not found errors
```bash
npm install
```

### TailwindCSS not working
- Check `tailwind.config.js` content paths
- Ensure `@tailwind` directives in `styles.css`
- Restart dev server

### NgRx DevTools not working
- Install Redux DevTools browser extension
- Check that `provideStoreDevtools()` is in app.config.ts

## 📄 License

MIT License

## 🚀 Next Steps

To complete the implementation:

1. **Create Components** - Implement feature components (Home, Products, Cart, etc.)
2. **Add Models** - Define TypeScript interfaces for entities
3. **Implement Services** - Create feature-specific services
4. **Add Tests** - Write unit and integration tests
5. **Optimize Performance** - Lazy loading, OnPush strategy
6. **PWA Support** - Add service workers for offline support

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Happy Coding! 🎉**
