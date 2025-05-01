
import { ShoppingCartItem } from "../models/ShoppingCartItem";
export class ShoppingCart{
    private _itemsProduct: ShoppingCartItem[]=[];
   
    private _total: number;
    public get total_1(): number {
        return this._total;
    }
    public set total_1(value: number) {
        this._total = value;
    }

    constructor(itemsProduct : ShoppingCartItem[]=[] ,total : number =0 ){
        this._itemsProduct = itemsProduct;
        this._total=total;
    }

    public addItem(item: ShoppingCartItem): void {
        const itemTrouver = this._itemsProduct.find(
            cartItem => cartItem.itemProduct.id === item.itemProduct.id
        );

        if (itemTrouver) {
            itemTrouver.AddProduct(item);
        } else {
            this._itemsProduct.push(item);
        }
        this._total += item.itemProduct.price * item.quantity;
    }

    public removeItem(item: ShoppingCartItem): void {
        const index = this._itemsProduct.indexOf(item);
        if (index !== -1) {
            this._itemsProduct.splice(index, 1);
            this._total -= item.itemProduct.price * item.quantity;
        }
    }

    public getItems(): ShoppingCartItem[] {
        return [...this._itemsProduct];
    }

    
    
}