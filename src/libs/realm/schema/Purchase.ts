import { Realm } from "@realm/react";
import { CartProps } from "../../../context/purchase";
import { Cart } from "./Cart";

type GenerateProps = {
  user_id: string;
  marketName: string;
  paymentMethod: string;
  purchaseValue: string;
  amountProducts: string;
  cart: CartProps[];
};

export class Purchase extends Realm.Object<Purchase> {
  _id!: Realm.BSON.UUID;
  user_id!: string;
  marketName!: string;
  paymentMethod!: string;
  purchaseValue!: string;
  amountProducts!: string;
  cart!: Realm.List<Cart>;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    marketName,
    user_id,
    paymentMethod,
    amountProducts,
    cart,
    purchaseValue,
  }: GenerateProps) {
    const newCart = cart.map((cartItem) => Cart.generate(cartItem));

    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      marketName,
      paymentMethod,
      purchaseValue,
      amountProducts,
      cart: newCart,
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
      amountProducts: "string",
      cart: "Cart[]",
      created_at: "date",
      updated_at: "date",
    },
    primaryKey: "_id",
  };
}
