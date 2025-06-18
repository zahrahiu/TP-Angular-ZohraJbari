// src/app/Cart/cart-item.model.ts
export interface CartItem {
  key: string;          // productId أو productId_volume
  productId: string;
  name: string;
  imageUrl?: string;
  volumeLabel?: string; // بحال 10ml
  unitPrice: number;    // الثمن بعد التخفيض إذا كان
  quantity: number;
}
