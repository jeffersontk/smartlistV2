import { createRealmContext } from "@realm/react";
import { Product } from "./schema/Product";
import { Purchase } from "./schema/Purchase";
import { Cart } from "./schema/Cart";

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
};

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
};

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Product, Purchase, Cart],
  });
