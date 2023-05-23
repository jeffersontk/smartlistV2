import { Realm } from "@realm/react";
import { Product } from "./Product";

type GenerateProps = {
  user_id: string;
  marketName: string;
  paymentMethod: string;
  purchaseValue: string;
  products: Product[];
};

export class Purchase extends Realm.Object<Purchase> {
  _id!: Realm.BSON.UUID;
  user_id!: string;
  marketName!: string;
  paymentMethod!: string;
  purchaseValue!: string;
  products!: Product[];
  created_at!: Date;
  updated_at!: Date;

  static generate({
    marketName,
    user_id,
    paymentMethod,
    products,
    purchaseValue,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      marketName,
      paymentMethod,
      purchaseValue,
      products,
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
      products: "data",
      created_at: "date",
      updated_at: "date",
    },
    primaryKey: "_id",
  };
}
