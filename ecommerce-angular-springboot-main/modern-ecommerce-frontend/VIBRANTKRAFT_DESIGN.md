# VibrantKraft Design System 🎨

## Vue d'ensemble

Ce projet a été redesigné avec le système de design **VibrantKraft** - un design moderne et élégant spécialement conçu pour une boutique de meubles e-commerce. Le design met l'accent sur l'élégance, la lisibilité et une expérience utilisateur exceptionnelle.

## 🎨 Palette de Couleurs

### Couleurs Principales
- **Primary (Orange chaleureux)**
  - 50: `#fef8f3`
  - 500: `#f2723d` (Principal)
  - 600: `#e05020` (Hover)

### Couleurs Secondaires
- **Secondary (Bleu profond)**
  - 500: `#3d7d92`
  - 600: `#2d5f71`

### Couleurs d'Accent
- **Accent (Or/Doré)**
  - 500: `#d88a1f`
  - 600: `#b66f10`

### Couleurs Neutres
- **Neutral (Échelle de gris)**
  - 50: `#fafafa` (Backgrounds clairs)
  - 900: `#171717` (Textes sombres)

## 📐 Typographie

### Polices
- **Display (Titres)**: Playfair Display - Police serif élégante
- **Body (Corps)**: Inter - Police sans-serif moderne
- **Mono**: JetBrains Mono - Code et données

### Hiérarchie
```css
h1: 3.5rem-7xl (Hero)
h2: 2.5rem-5xl (Sections)
h3: 1.5rem-2xl (Cards)
Body: 1rem (Paragraphes)
```

## 🎭 Animations

### Animations disponibles
- `animate-fade-in`: Apparition en fondu
- `animate-slide-up`: Glissement vers le haut
- `animate-slide-right`: Glissement vers la droite
- `animate-slide-left`: Glissement vers la gauche
- `animate-scale-in`: Zoom progressif
- `animate-float`: Flottement continu

## 🧩 Composants

### Navbar
- **Sticky navigation** avec backdrop blur
- Logo animé avec gradient
- Menu responsive avec animation slide-down
- Dropdown pour catégories
- Icônes d'action (recherche, thème, panier)
- Badge de notification sur le panier

### Hero Section
- **Min-height 90vh** pour impact maximum
- Grid 2 colonnes (contenu + image)
- Pattern de fond subtil
- Badges flottants animés
- Statistiques clés
- CTA multiples

### Cards
- **Shadow elegant** pour profondeur
- Hover effect avec translation
- Overlay avec actions au survol
- Border radius moderne (2xl)
- Gradient backgrounds

### Footer
- **5 colonnes** sur desktop
- Logo et description
- Liens de navigation organisés
- Informations de contact avec icônes
- Liens réseaux sociaux
- Barre de copyright

## 🎨 Classes Utilitaires Personnalisées

### Layouts
```css
.container-custom: max-w-7xl mx-auto px-4
.section-padding: py-16 md:py-24 lg:py-32
```

### Cards
```css
.card-elegant: bg-white rounded-2xl shadow-elegant
.card-hover: hover:shadow-elegant-lg hover:-translate-y-2
```

### Buttons
```css
.btn-primary: Primary button avec gradient hover
.btn-secondary: Secondary button
.btn-outline: Outlined button avec fill au hover
```

### Backgrounds
```css
.gradient-bg: Gradient principal (primary + accent)
.gradient-bg-subtle: Gradient subtil pour sections
.hero-pattern: Pattern de fond avec gradients radiaux
```

### Text
```css
.text-gradient: Texte avec gradient (primary + accent)
.text-gradient-secondary: Texte avec gradient secondaire
```

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Grid System
- Mobile: 1 colonne
- Tablet: 2 colonnes
- Desktop: 4 colonnes (produits)
- Large: 5 colonnes (footer)

## 🌙 Dark Mode

Le design supporte entièrement le dark mode avec :
- Transitions douces entre modes
- Couleurs adaptées pour la lisibilité
- Contraste optimisé
- Classes `dark:` pour tous les composants

## 🎯 UX Best Practices

### Accessibilité
- Contraste de couleurs conforme WCAG
- Tailles de police lisibles
- Zones de clic de 44px minimum
- Icônes avec labels descriptifs

### Performance
- Lazy loading des images
- Animations optimisées avec GPU
- Transitions fluides (300ms)
- Scroll smooth

### Feedback Utilisateur
- Hover states sur tous les éléments interactifs
- Loading states
- Success/error messages
- Micro-animations pour les interactions

## 🚀 Fonctionnalités Clés

### Page d'accueil
1. **Hero Section** - Impact visuel immédiat
2. **Categories** - 4 catégories principales
3. **Featured Products** - Produits en vedette
4. **Why Choose Us** - 4 avantages clés
5. **Newsletter** - Inscription avec gradient background

### Navigation
- Menu principal avec 5 liens
- Dropdown de catégories avec icônes
- Actions rapides (search, theme, cart)
- Menu mobile responsive

### Interactions
- Hover effects sur cartes produits
- Actions overlay sur images
- Ratings par étoiles
- Boutons d'ajout au panier

## 📦 Technologies Utilisées

- **Angular 18** - Framework frontend
- **Tailwind CSS 3** - Utility-first CSS
- **Angular Material** - Composants UI
- **Google Fonts** - Playfair Display + Inter
- **CSS Grid & Flexbox** - Layout moderne

## 🎨 Design Tokens

```typescript
colors: {
  primary: VibrantKraft Orange
  secondary: Deep Blue
  accent: Golden
  neutral: Gray Scale
}

spacing: {
  section: 16-32 (section-padding)
  card: 6 (p-6)
  container: 4-8 (px-4 sm:px-6 lg:px-8)
}

shadows: {
  elegant: Soft depth
  elegant-lg: Strong elevation
  soft: Subtle shadow
}

radius: {
  xl: 1rem
  2xl: 1.5rem
  3xl: 2rem
}
```

## 📝 Notes de Développement

### Installation des polices
Les polices Google Fonts sont chargées via CDN dans `styles.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap');
```

### Configuration Tailwind
Voir `tailwind.config.js` pour la configuration complète des couleurs, animations et extensions.

### Composants Standalone
Tous les composants utilisent l'approche standalone d'Angular 18 pour une meilleure modularité.

## 🎯 Prochaines Étapes

Pour implémenter le design complet :
1. Ajouter des images réelles de produits
2. Implémenter la page liste de produits
3. Créer la page détails produit
4. Styliser le panier et checkout
5. Ajouter la page à propos
6. Créer la section blog

## 📞 Support

Pour toute question sur le design system, consultez ce document ou référez-vous aux composants existants comme exemples.

---

**VibrantKraft Design System v1.0**
Created with ❤️ for modern furniture e-commerce
