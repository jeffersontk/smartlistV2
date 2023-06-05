import React from "react";
import { Container, Content, ItemCart, Name, Price, Quantity } from "./styles";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import { useRoute } from "@react-navigation/native";

export function PurchaseDetails() {
  const route = useRoute();
  const purchase = route.params as HistoricCardProps;
  const { cart } = purchase;

  return (
    <Container>
      <HistoricCard activeOpacity={1} data={purchase} />

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
