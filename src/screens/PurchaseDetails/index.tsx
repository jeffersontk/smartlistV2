import React from "react";
import { Container, Content, ItemCart, Name, Price, Quantity } from "./styles";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import { useRoute } from "@react-navigation/native";

export function PurchaseDetails() {
  const route = useRoute();
  const purchase = route.params as HistoricCardProps;

  return (
    <Container>
      <HistoricCard activeOpacity={1} data={purchase} />

      <Content>
        <ItemCart>
          <Name>Arroz</Name>
          <Quantity>3 kg</Quantity>
          <Price>R$ 8.32</Price>
        </ItemCart>
      </Content>
    </Container>
  );
}
