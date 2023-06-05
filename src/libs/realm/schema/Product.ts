import { Realm } from "@realm/react";

export type GenerateProductProps = {
  user_id: string;
  name: string;
  category: string;
};

export class Product extends Realm.Object<Product> {
  _id!: Realm.BSON.UUID;
  user_id!: string;
  name!: string;
  category!: string;
  created_at!: Date;
  updated_at!: Date;

  static generate({ user_id, name, category }: GenerateProductProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      name,
      category,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static schema = {
    name: "Product",
    primaryKey: "_id",

    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      name: "string",
      category: "string",
      created_at: "date",
      updated_at: "date",
    },
  };
}
