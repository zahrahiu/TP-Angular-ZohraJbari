export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public quantity: number,
    public imageUrl?: string,
    public category?: string,
    public hoverImageUrl?: string
    
    
  ) {}

  isLowQuantity(): boolean {
    return this.quantity < 10;
  }
}
