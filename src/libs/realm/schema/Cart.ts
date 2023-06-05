import { Realm } from "@realm/react";

type GenerateCartProps = {
  user_id: string;
  name: string;
  category: string;
  price: string;
  quantity: string;
  measurement: string;
};

export class Cart extends Realm.Object<Cart> {
  user_id!: string;
  name!: string;
  category!: string;
  price!: string;
  quantity!: string;
  measurement!: string;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    category,
    measurement,
    name,
    price,
    quantity,
    user_id,
  }: GenerateCartProps) {
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
    name: "Cart",
    primaryKey: "_id",
    properties: {
      _id: "uuid",
      user_id: "string",
      name: "string",
      category: "string",
      price: "string",
      quantity: "string",
      measurement: "string",
    },
  };
}
