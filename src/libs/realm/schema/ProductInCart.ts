import { Realm } from "@realm/react";

type GenerateProps = {
  user_id: string;
  name: string;
  category: string;
  price: string;
  quantity: string;
  measurement: string;
};

export class ProductInCart extends Realm.Object<ProductInCart> {
  _id!: string;
  user_id!: string;
  name!: string;
  category!: string;
  price!: string;
  quantity!: string;
  measurement!: string;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    user_id,
    name,
    category,
    price,
    quantity,
    measurement,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      name,
      category,
      price,
      quantity,
      measurement,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static schema = {
    name: "ProductInCart",
    primaryKey: "_id",

    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      name: "string",
      category: "string",
      price: "string",
      quantity: "string",
      measurement: "string",
      created_at: "date",
      updated_at: "date",
    },
  };
}
