import React from "react";
import { Container, Content, ItemCart, Name, Price, Quantity } from "./styles";
import { HistoricCard } from "../../components/HistoricCard";
import { useRoute } from "@react-navigation/native";
import { Purchase } from "../../libs/realm/schema/Purchase";
import { CartProps } from "../../context/purchase";

export function PurchaseDetails() {
  const route = useRoute();
  const purchase = route.params as Purchase;
  const { cart } = purchase;

  return (
    <Container>
      <HistoricCard activeOpacity={1} data={purchase} />

      <Content
        data={cart}
        keyExtractor={(item: any) => String(item._id)}
        renderItem={({ item }: any) => (
          <ItemCart>
            <Name>{item.name}</Name>
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
