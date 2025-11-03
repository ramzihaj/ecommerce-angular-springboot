export interface TunisiaProduct {
  id: number;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number; // Prix en TND
  discountPrice?: number; // Prix réduit en TND
  stockQuantity: number;
  categoryId: number;
  categoryName?: string;
  brand?: string;
  sku: string;
  imageUrl: string;
  images?: string[];
  specifications?: Record<string, any>;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  weightKg?: number;
  material?: string;
  materialAr?: string;
  color?: string;
  colorAr?: string;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  madeInTunisia: boolean; // Produit Made in Tunisia
  active: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const MOCK_TUNISIA_PRODUCTS: TunisiaProduct[] = [
  {
    id: 1,
    name: 'Canapé d\'Angle Moderne 5 Places',
    nameAr: 'كنبة زاوية حديثة 5 أماكن',
    description: 'Canapé d\'angle spacieux avec revêtement en tissu de qualité supérieure',
    descriptionAr: 'كنبة زاوية واسعة مع كسوة قماش عالية الجودة',
    price: 2499.000,
    discountPrice: 2199.000,
    stockQuantity: 15,
    categoryId: 1,
    categoryName: 'Salon',
    brand: 'Meublatex',
    sku: 'CANAPE-ANGLE-001',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    dimensions: { length: 300, width: 250, height: 85 },
    weightKg: 85.5,
    material: 'Tissu et bois massif',
    materialAr: 'قماش وخشب صلب',
    color: 'Gris anthracite',
    colorAr: 'رمادي غامق',
    featured: true,
    newArrival: true,
    bestSeller: true,
    madeInTunisia: true,
    active: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 2,
    name: 'Table Basse en Bois d\'Olivier',
    nameAr: 'طاولة قهوة خشب زيتون',
    description: 'Table basse artisanale en bois d\'olivier tunisien',
    descriptionAr: 'طاولة قهوة حرفية من خشب الزيتون التونسي',
    price: 899.000,
    discountPrice: 799.000,
    stockQuantity: 25,
    categoryId: 1,
    categoryName: 'Salon',
    brand: 'Artisan Tunisien',
    sku: 'TABLE-BASSE-OLIVIER',
    imageUrl: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800',
    dimensions: { length: 120, width: 60, height: 45 },
    weightKg: 28.0,
    material: 'Bois d\'olivier massif',
    materialAr: 'خشب زيتون صلب',
    color: 'Naturel',
    colorAr: 'طبيعي',
    featured: true,
    newArrival: true,
    bestSeller: false,
    madeInTunisia: true,
    active: true,
    rating: 5.0,
    reviewCount: 18
  },
  {
    id: 3,
    name: 'Chambre Complète Adulte',
    nameAr: 'غرفة نوم كاملة للكبار',
    description: 'Ensemble chambre: lit 160x200, 2 chevets, armoire 4 portes, coiffeuse',
    descriptionAr: 'طقم غرفة: سرير 160×200، 2 طاولة ليلية، خزانة 4 أبواب، مرآة',
    price: 4599.000,
    discountPrice: 3999.000,
    stockQuantity: 6,
    categoryId: 2,
    categoryName: 'Chambre',
    brand: 'Meublatex',
    sku: 'CHAMBRE-ADULTE-01',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    dimensions: { length: 200, width: 160 },
    weightKg: 180.0,
    material: 'MDF plaqué chêne',
    materialAr: 'MDF مكسو بالبلوط',
    color: 'Chêne clair',
    colorAr: 'بلوط فاتح',
    featured: true,
    newArrival: false,
    bestSeller: true,
    madeInTunisia: true,
    active: true,
    rating: 4.7,
    reviewCount: 32
  },
  {
    id: 4,
    name: 'Table à Manger Extensible 6-8 Places',
    nameAr: 'طاولة طعام قابلة للتمديد 6-8 أماكن',
    description: 'Table extensible moderne avec rallonges intégrées',
    descriptionAr: 'طاولة قابلة للتمديد حديثة مع تمديدات مدمجة',
    price: 1799.000,
    discountPrice: 1599.000,
    stockQuantity: 14,
    categoryId: 3,
    categoryName: 'Salle à Manger',
    brand: 'Mobilia',
    sku: 'TABLE-MANGER-EXT-01',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    dimensions: { length: 220, width: 90 },
    weightKg: 58.0,
    material: 'MDF laqué',
    materialAr: 'MDF مطلي',
    color: 'Blanc/Chêne',
    colorAr: 'أبيض/بلوط',
    featured: true,
    newArrival: true,
    bestSeller: true,
    madeInTunisia: false,
    active: true,
    rating: 4.6,
    reviewCount: 28
  },
  {
    id: 5,
    name: 'Cuisine Complète 260cm',
    nameAr: 'مطبخ كامل 260 سم',
    description: 'Cuisine modulaire complète avec évier et plan de travail',
    descriptionAr: 'مطبخ معياري كامل مع حوض وسطح عمل',
    price: 4999.000,
    discountPrice: 4499.000,
    stockQuantity: 4,
    categoryId: 4,
    categoryName: 'Cuisine',
    brand: 'Kitchenex',
    sku: 'CUISINE-260-COMP',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    dimensions: { length: 260, height: 215 },
    weightKg: 220.0,
    material: 'MDF hydrofuge',
    materialAr: 'MDF مقاوم للماء',
    color: 'Blanc/Gris',
    colorAr: 'أبيض/رمادي',
    featured: true,
    newArrival: true,
    bestSeller: true,
    madeInTunisia: true,
    active: true,
    rating: 4.9,
    reviewCount: 15
  },
  {
    id: 6,
    name: 'Bureau d\'Angle Moderne',
    nameAr: 'مكتب زاوي حديث',
    description: 'Bureau d\'angle spacieux avec étagères murales',
    descriptionAr: 'مكتب زاوية واسع مع رفوف حائطية',
    price: 1399.000,
    discountPrice: 1199.000,
    stockQuantity: 16,
    categoryId: 5,
    categoryName: 'Bureau',
    brand: 'Office Pro',
    sku: 'BUREAU-ANGLE-01',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
    dimensions: { length: 150, width: 150 },
    weightKg: 52.0,
    material: 'MDF',
    materialAr: 'MDF',
    color: 'Chêne sonoma',
    colorAr: 'بلوط سونوما',
    featured: false,
    newArrival: true,
    bestSeller: true,
    madeInTunisia: false,
    active: true,
    rating: 4.5,
    reviewCount: 22
  },
  {
    id: 7,
    name: 'Tapis Berbère Fait Main',
    nameAr: 'سجادة بربرية يدوية',
    description: 'Tapis artisanal berbère en pure laine',
    descriptionAr: 'سجادة حرفية بربرية من صوف نقي',
    price: 799.000,
    discountPrice: 699.000,
    stockQuantity: 20,
    categoryId: 6,
    categoryName: 'Décoration',
    brand: 'Artisan Tunisien',
    sku: 'TAPIS-BERBERE-200',
    imageUrl: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=800',
    dimensions: { length: 200, width: 140 },
    weightKg: 8.5,
    material: 'Laine pure',
    materialAr: 'صوف نقي',
    color: 'Multicolore',
    colorAr: 'متعدد الألوان',
    featured: true,
    newArrival: true,
    bestSeller: true,
    madeInTunisia: true,
    active: true,
    rating: 5.0,
    reviewCount: 41
  },
  {
    id: 8,
    name: 'Lustre Marocain Moderne',
    nameAr: 'ثريا مغربية حديثة',
    description: 'Lustre en métal doré avec verre coloré',
    descriptionAr: 'ثريا من معدن ذهبي مع زجاج ملون',
    price: 449.000,
    discountPrice: 389.000,
    stockQuantity: 30,
    categoryId: 6,
    categoryName: 'Décoration',
    brand: 'Lux Deco',
    sku: 'LUSTRE-MAROC-01',
    imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
    weightKg: 4.2,
    material: 'Métal et verre',
    materialAr: 'معدن وزجاج',
    color: 'Doré',
    colorAr: 'ذهبي',
    featured: true,
    newArrival: true,
    bestSeller: false,
    madeInTunisia: false,
    active: true,
    rating: 4.4,
    reviewCount: 19
  }
];
