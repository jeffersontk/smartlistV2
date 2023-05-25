import React, { useState } from "react";
import { TouchableOpacityProps } from "react-native";
import { Check, Clock } from "phosphor-react-native";
import {
  Container,
  ContentDate,
  Header,
  MarketName,
  PurchaseDay,
  Text,
} from "./styles";
import { useTheme } from "styled-components";
import { Purchase } from "../../libs/realm/schema/Purchase";
import dayjs from "dayjs";

export type HistoricCardProps = {
  id: string;
  marketName: string;
  purchaseDay: string;
  purchaseValue: string;
  quantityItems: string;
  paymentMethod: string;
};

type Props = TouchableOpacityProps & {
  data: Purchase;
  enableSelect?: boolean;
};

export function HistoricCard({ data, enableSelect = false, ...rest }: Props) {
  const { COLORS } = useTheme();
  const { cart, created_at, paymentMethod, marketName, purchaseValue } = data;
  const selectCard = { borderColor: COLORS.BRAND_MID, borderWidth: 2 };
  const [isSelected, setIsSelected] = useState(false);

  function handleSelected() {
    if (enableSelect) {
      setIsSelected(!isSelected);
    }
  }
  const create = dayjs(created_at).format("DD/MM/YYYY");

  return (
    <Container
      style={isSelected && selectCard}
      onPress={handleSelected}
      {...rest}
    >
      <Header>
        <MarketName>{marketName}</MarketName>
        <ContentDate>
          <Clock size={16} color={COLORS.GRAY_400} />
          <PurchaseDay>{create}</PurchaseDay>
        </ContentDate>
      </Header>
      <Text>
        Valor da compra:
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(+purchaseValue)}
      </Text>
      <Text>Quantidade de items: {cart.length.toString()}</Text>
      <Text>Pagamento: {paymentMethod}</Text>
    </Container>
  );
}
