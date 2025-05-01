import { Product } from "../models/product.model";

export class ShoppingCartItem{
    private _itemProduct: Product;
    private _quantity: number;
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    constructor(readonly itemProduct:Product,quantity:number=1){
        this._itemProduct=itemProduct;
        this._quantity=quantity;
    }

    public AddProduct(item: ShoppingCartItem): void {
        
        if (this._itemProduct === item._itemProduct) {
            this._quantity += item._quantity;
        }
    }

    public subtractProduct(ShoppingCartItem : ShoppingCartItem) : void {
        if(this._itemProduct == ShoppingCartItem._itemProduct)
            this._quantity -= ShoppingCartItem._quantity;
    }

    
    

}