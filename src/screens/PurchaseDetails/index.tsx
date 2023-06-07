import React from "react";
import { Container, Content, ItemCart, Name, Price, Quantity } from "./styles";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useObject, useRealm } from "../../libs/realm";
import { Purchase } from "../../libs/realm/schema/Purchase";

export function PurchaseDetails() {
  const route = useRoute();
  const { goBack } = useNavigation();
  const purchase = route.params as HistoricCardProps;
  const { cart } = purchase;
  const _id = purchase.id;
  const currentPurchase = useObject(Purchase, _id);
  const realm = useRealm();

  function handleDelete() {
    try {
      realm.write(() => {
        realm.delete(currentPurchase);
      });
      goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <HistoricCard
        activeOpacity={1}
        data={purchase}
        isDeleted
        handleDelete={handleDelete}
      />

      <Content
        data={cart}
        keyExtractor={(item: any) => String(item._id)}
        renderItem={({ item }: any) => (
          <ItemCart>
            <Name numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Name>
            <Quantity>
              {item.quantity} {item.measurement}
            </Quantity>
            <Price>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(+item.price)}
            </Price>
          </ItemCart>
        )}
      ></Content>
    </Container>
  );
}
