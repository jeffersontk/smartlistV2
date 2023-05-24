import { Realm } from "@realm/react";
import { ProductInCart } from "./ProductInCart";

type GenerateProps = {
  user_id: string;
  marketName: string;
  paymentMethod: string;
  purchaseValue: string;
  cart: ProductInCart[];
};

export const CartSchema = {
  name: "Cart",
  properties: {
    id: "int",
    productName: "string",
    category: "string",
    price: "string",
    quantity: "string",
    measurement: "string",
  },
  primaryKey: "id",
};

export class Purchase extends Realm.Object<Purchase> {
  _id!: Realm.BSON.UUID;
  user_id!: string;
  marketName!: string;
  paymentMethod!: string;
  purchaseValue!: string;
  cart!: Realm.List<ProductInCart>;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    marketName,
    user_id,
    paymentMethod,
    cart,
    purchaseValue,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      marketName,
      paymentMethod,
      purchaseValue,
      cart,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static schema = {
    name: "Purchase",
    properties: {
      _id: "uuid",
      user_id: "string",
      marketName: "string",
      paymentMethod: "string",
      purchaseValue: "string",
      cart: {
        type: "list",
        objectType: "ProductInCart",
      },
      created_at: "date",
      updated_at: "date",
    },
    primaryKey: "_id",
  };
}
