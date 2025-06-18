export interface Volume {
  label: string;
  price: number;
  imageUrl?: string;
}

export class Product {
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
    public discountPercentage: number = 0,
    offerEndsAt?: Date | string,
    public genre?: string,
    public marque?: string,
    volumes?: Volume[],
    public ingredientsImageUrl?: string
  ) {
    this.offerEndsAt =
      typeof offerEndsAt === 'string' ? new Date(offerEndsAt) : offerEndsAt;

    this.volumes = volumes;
  }

  isOnSale(): boolean {
    return (
      this.discountPercentage > 0 &&
      (!this.offerEndsAt || this.offerEndsAt.getTime() > Date.now())
    );
  }

  getDiscountedPrice(): number {
    return this.isOnSale()
      ? Math.round(this.price * (1 - this.discountPercentage / 100))
      : this.price;
  }

  isLowQuantity(): boolean {
    return this.quantity < 10;
  }
}
