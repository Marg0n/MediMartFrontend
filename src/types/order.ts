import { IUser } from "./customer";

export interface IProductItem {
  _id: string;
  productId: string;
  quantity: number;
}

export interface IOrderDB {
  _id: string;
  products: IProductItem[];
  user: IUser;
  totalPrice: number;
  shippingStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | string;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED" | string;
  transactionId: string;
  isDeleted: boolean;
  city: string;
  shippingAddress: string;
}
