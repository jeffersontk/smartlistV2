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
  console.log("data", data);
  const { COLORS } = useTheme();
  const selectCard = { borderColor: COLORS.BRAND_MID, borderWidth: 2 };
  const [isSelected, setIsSelected] = useState(false);

  function handleSelected() {
    if (enableSelect) {
      setIsSelected(!isSelected);
    }
  }

  return (
    <Container
      style={isSelected && selectCard}
      onPress={handleSelected}
      {...rest}
    >
      <Header>
        <MarketName>{data.marketName}</MarketName>
        <ContentDate>
          <Clock size={16} color={COLORS.GRAY_400} />
          {/*   <PurchaseDay>{data.purchaseDay}</PurchaseDay> */}
        </ContentDate>
      </Header>
      <Text>
        Valor da compra:
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(+data.purchaseValue)}
      </Text>
      {/*       <Text>Quantidade de items: {data.quantityItems}</Text> */}
      <Text>Pagamento: {data.paymentMethod}</Text>
    </Container>
  );
}
