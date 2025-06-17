// src/app/models/product.model.ts
export interface Volume {
  label: string;
  price: number;
  imageUrl?: string;
}

export class Product {
  /** التاريخ النهائي للعرض (قد يكون string من الـ backend) */
  public offerEndsAt?: Date;
  public volumes?: Volume[];

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public quantity: number,
    public imageUrl?: string,
    public category?: string,
    public hoverImageUrl?: string,
    public isFavorite: boolean = false,
    /** نسبة التخفيض – 0 إذا ما كاينش */
    public discountPercentage: number = 0,
    offerEndsAt?: Date | string,
    public genre?: string,
    public marque?: string,
    volumes?: Volume[],
    public ingredientsImageUrl?: string
  ) {
    // حوّل offerEndsAt لـ Date إلا كانت string
    this.offerEndsAt =
      typeof offerEndsAt === 'string' ? new Date(offerEndsAt) : offerEndsAt;

    this.volumes = volumes;
  }

  /** واش البرودوي فالتخفيض؟ */
  isOnSale(): boolean {
    return (
      this.discountPercentage > 0 &&
      (!this.offerEndsAt || this.offerEndsAt.getTime() > Date.now())
    );
  }

  /** الثمن من بعد التخفيض (مقرب) */
  getDiscountedPrice(): number {
    return this.isOnSale()
      ? Math.round(this.price * (1 - this.discountPercentage / 100))
      : this.price;
  }

  /** واش الكمية قليلة */
  isLowQuantity(): boolean {
    return this.quantity < 10;
  }
}
