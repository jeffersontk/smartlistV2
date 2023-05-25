import { createRealmContext } from "@realm/react";
import { Product } from "./schema/Product";
import { CartSchema, Purchase } from "./schema/Purchase";
import { ProductInCart } from "./schema/ProductInCart";

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Product, ProductInCart, Purchase, CartSchema],
  });
