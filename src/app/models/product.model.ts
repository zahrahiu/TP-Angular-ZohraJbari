export class Product {
  public offerEndsAt?: Date;  
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
    public discountPercentage: number=0,
    offerEndsAt?: Date
    
  ) {this.offerEndsAt = offerEndsAt;}

 isOnSale(): boolean {
    return this.discountPercentage > 0 &&
           (!this.offerEndsAt || this.offerEndsAt.getTime() > Date.now());
  }

  getDiscountedPrice(): number {
    return this.isOnSale() 
      ? Math.round(this.price * (1 - this.discountPercentage! / 100))
      : this.price;
  }

   isLowQuantity(): boolean {
    return this.quantity < 10;
  }
}


