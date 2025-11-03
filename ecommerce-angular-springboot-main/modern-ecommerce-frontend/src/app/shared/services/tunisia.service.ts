import { Injectable } from '@angular/core';

export interface TunisiaGovernorate {
  code: string;
  name: string;
  nameAr: string;
  shippingDays: string;
  shippingFeeTnd: number;
}

export const TUNISIA_GOVERNORATES: TunisiaGovernorate[] = [
  { code: 'TUN', name: 'Tunis', nameAr: 'تونس', shippingDays: '1-2', shippingFeeTnd: 7 },
  { code: 'ARI', name: 'Ariana', nameAr: 'أريانة', shippingDays: '1-2', shippingFeeTnd: 7 },
  { code: 'BEN', name: 'Ben Arous', nameAr: 'بن عروس', shippingDays: '1-2', shippingFeeTnd: 7 },
  { code: 'MAN', name: 'Manouba', nameAr: 'منوبة', shippingDays: '2-3', shippingFeeTnd: 7 },
  { code: 'NAB', name: 'Nabeul', nameAr: 'نابل', shippingDays: '2-3', shippingFeeTnd: 7 },
  { code: 'BIZ', name: 'Bizerte', nameAr: 'بنزرت', shippingDays: '2-3', shippingFeeTnd: 7 },
  { code: 'ZAG', name: 'Zaghouan', nameAr: 'زغوان', shippingDays: '2-3', shippingFeeTnd: 7 },
  { code: 'SOU', name: 'Sousse', nameAr: 'سوسة', shippingDays: '2-4', shippingFeeTnd: 10 },
  { code: 'MON', name: 'Monastir', nameAr: 'المنستير', shippingDays: '2-4', shippingFeeTnd: 10 },
  { code: 'MAH', name: 'Mahdia', nameAr: 'المهدية', shippingDays: '3-5', shippingFeeTnd: 10 },
  { code: 'SFA', name: 'Sfax', nameAr: 'صفاقس', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'KAI', name: 'Kairouan', nameAr: 'القيروان', shippingDays: '3-5', shippingFeeTnd: 10 },
  { code: 'GAB', name: 'Gabès', nameAr: 'قابس', shippingDays: '4-6', shippingFeeTnd: 15 },
  { code: 'MED', name: 'Médenine', nameAr: 'مدنين', shippingDays: '4-6', shippingFeeTnd: 15 },
  { code: 'TAT', name: 'Tataouine', nameAr: 'تطاوين', shippingDays: '4-6', shippingFeeTnd: 15 },
  { code: 'GAF', name: 'Gafsa', nameAr: 'قفصة', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'TOZ', name: 'Tozeur', nameAr: 'توزر', shippingDays: '4-6', shippingFeeTnd: 15 },
  { code: 'KEB', name: 'Kébili', nameAr: 'قبلي', shippingDays: '4-6', shippingFeeTnd: 15 },
  { code: 'KAS', name: 'Kasserine', nameAr: 'القصرين', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'SID', name: 'Sidi Bouzid', nameAr: 'سيدي بوزيد', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'JEN', name: 'Jendouba', nameAr: 'جندوبة', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'KEF', name: 'Le Kef', nameAr: 'الكاف', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'SIL', name: 'Siliana', nameAr: 'سليانة', shippingDays: '3-5', shippingFeeTnd: 12 },
  { code: 'BEJ', name: 'Béja', nameAr: 'باجة', shippingDays: '3-5', shippingFeeTnd: 12 },
];

export interface PaymentMethod {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  enabled: boolean;
  maxAmountTnd?: number;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Paiement à la livraison',
    nameAr: 'الدفع عند الاستلام',
    icon: 'payments',
    description: 'Payez en espèces lors de la réception',
    descriptionAr: 'ادفع نقدًا عند الاستلام',
    enabled: true,
    maxAmountTnd: 2000
  },
  {
    id: 'd17',
    name: 'D17 (Carte bancaire)',
    nameAr: 'D17 (بطاقة بنكية)',
    icon: 'credit_card',
    description: 'Paiement sécurisé par carte bancaire',
    descriptionAr: 'دفع آمن ببطاقة بنكية',
    enabled: true
  },
  {
    id: 'konnect',
    name: 'Konnect',
    nameAr: 'كونكت',
    icon: 'phone_android',
    description: 'Paiement mobile Konnect',
    descriptionAr: 'دفع عبر كونكت موبايل',
    enabled: true
  },
  {
    id: 'flouci',
    name: 'Flouci',
    nameAr: 'فلوسي',
    icon: 'account_balance_wallet',
    description: 'Paiement via wallet Flouci',
    descriptionAr: 'دفع عبر محفظة فلوسي',
    enabled: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class TunisiaService {
  private readonly FREE_SHIPPING_THRESHOLD = 200; // TND
  private readonly EXPRESS_SHIPPING_EXTRA = 8; // TND

  constructor() { }

  /**
   * Formate un montant en dinars tunisiens
   */
  formatTND(amount: number, locale: string = 'fr-TN'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(amount);
  }

  /**
   * Calcule les frais de livraison
   */
  calculateShipping(
    governorateCode: string,
    orderTotal: number,
    isExpress: boolean = false
  ): { fee: number; estimatedDays: string; isFree: boolean } {
    const governorate = TUNISIA_GOVERNORATES.find(g => g.code === governorateCode);
    
    if (!governorate) {
      return { fee: 7, estimatedDays: '3-5', isFree: false };
    }

    const isFree = orderTotal >= this.FREE_SHIPPING_THRESHOLD;
    let fee = isFree ? 0 : governorate.shippingFeeTnd;
    
    if (isExpress && !isFree) {
      fee += this.EXPRESS_SHIPPING_EXTRA;
    }

    const estimatedDays = isExpress 
      ? this.decreaseDays(governorate.shippingDays)
      : governorate.shippingDays;

    return { fee, estimatedDays, isFree };
  }

  /**
   * Diminue les jours de livraison pour express
   */
  private decreaseDays(days: string): string {
    const [min, max] = days.split('-').map(Number);
    return `${Math.max(1, min - 1)}-${Math.max(2, max - 1)}`;
  }

  /**
   * Retourne tous les gouvernorats
   */
  getGovernorates(): TunisiaGovernorate[] {
    return TUNISIA_GOVERNORATES;
  }

  /**
   * Retourne un gouvernorat par code
   */
  getGovernorate(code: string): TunisiaGovernorate | undefined {
    return TUNISIA_GOVERNORATES.find(g => g.code === code);
  }

  /**
   * Retourne les méthodes de paiement disponibles
   */
  getPaymentMethods(): PaymentMethod[] {
    return PAYMENT_METHODS.filter(pm => pm.enabled);
  }

  /**
   * Valide un numéro de téléphone tunisien
   */
  validateTunisianPhone(phone: string): boolean {
    const regex = /^\+216\s?\d{2}\s?\d{3}\s?\d{3}$/;
    return regex.test(phone);
  }

  /**
   * Formate un numéro de téléphone tunisien
   */
  formatTunisianPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('216')) {
      const number = cleaned.substring(3);
      return `+216 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5, 8)}`;
    }
    return phone;
  }

  /**
   * Vérifie si une méthode de paiement est disponible pour un montant
   */
  isPaymentMethodAvailable(methodId: string, amount: number): boolean {
    const method = PAYMENT_METHODS.find(pm => pm.id === methodId);
    if (!method || !method.enabled) return false;
    if (method.maxAmountTnd && amount > method.maxAmountTnd) return false;
    return true;
  }
}
