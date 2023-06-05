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
import dayjs from "dayjs";
import { Cart } from "../../libs/realm/schema/Cart";

export type HistoricCardProps = {
  id: any;
  marketName: string;
  purchaseDay: Date;
  purchaseValue: string;
  quantityItems: string;
  paymentMethod: string;
  cart: Realm.List<Cart>;
  isSync: boolean;
};

type Props = TouchableOpacityProps & {
  data: HistoricCardProps;
  enableSelect?: boolean;
};

export function HistoricCard({ data, enableSelect = false, ...rest }: Props) {
  const { COLORS } = useTheme();
  const {
    purchaseDay,
    paymentMethod,
    marketName,
    purchaseValue,
    quantityItems,
  } = data;
  const selectCard = { borderColor: COLORS.BRAND_MID, borderWidth: 2 };
  const [isSelected, setIsSelected] = useState(false);

  function handleSelected() {
    if (enableSelect) {
      setIsSelected(!isSelected);
    }
  }
  const create = dayjs(purchaseDay).format("DD/MM/YYYY");

  return (
    <Container
      style={isSelected && selectCard}
      onPress={handleSelected}
      {...rest}
    >
      <Header>
        <MarketName>{marketName}</MarketName>
        {data.isSync ? (
          <Check size={24} color={COLORS.BRAND_LIGHT} />
        ) : (
          <Clock size={24} color={COLORS.GRAY_400} />
        )}
      </Header>
      <Text>
        Valor da compra:
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(+purchaseValue)}
      </Text>
      <Text>Quantidade de items: {quantityItems}</Text>
      <Text>Pagamento: {paymentMethod}</Text>
      <Text>Data da compra: {create}</Text>
    </Container>
  );
}
