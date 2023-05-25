import { Realm } from "@realm/react";
import { CartProps } from "../../../context/purchase";

type GenerateProps = {
  user_id: string;
  marketName: string;
  paymentMethod: string;
  purchaseValue: string;
  cart: CartProps[];
};

export const CartSchema = {
  name: "Cart",
  primaryKey: "_id",
  properties: {
    _id: "uuid",
    name: "string",
    category: "string",
    price: "string",
    quantity: "string",
    measurement: "string",
  },
};

export class Purchase extends Realm.Object<Purchase> {
  _id!: Realm.BSON.UUID;
  user_id!: string;
  marketName!: string;
  paymentMethod!: string;
  purchaseValue!: string;
  cart!: Realm.List<CartProps>;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    marketName,
    user_id,
    paymentMethod,
    cart,
    purchaseValue,
  }: GenerateProps) {
    const newCart = cart.map((cartItem) => {
      const { _id, ...rest } = cartItem;
      return {
        _id: new Realm.BSON.UUID(),
        ...rest,
      };
    });

    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      marketName,
      paymentMethod,
      purchaseValue,
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
      cart: {
        type: "list",
        objectType: "Cart",
      },
      created_at: "date",
      updated_at: "date",
    },
    primaryKey: "_id",
  };
}
