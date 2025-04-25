export interface IOrder {
  products: IOrderProduct[];
  coupon?: string;
  shippingAddress: string;
  paymentMethod?: string;
}

export interface IOrderProduct {
  product: string | undefined;
  quantity: number;
  price: number;
}

export interface ICoupon {
  shopId: string;
  subTotal: number;
  couponCode: string;
}

export interface IPartialOrder{
  products: IOrderProduct[];
  shippingAddress?: string;
  city?: string;
  user: string;
  totalPrice: number;
}