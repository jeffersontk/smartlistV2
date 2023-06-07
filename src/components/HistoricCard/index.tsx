import React, { useState } from "react";
import { TouchableOpacityProps } from "react-native";
import { Check, Clock, Trash } from "phosphor-react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

export type HistoricCardProps = {
  id: Realm.BSON.UUID;
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
  isDeleted?: boolean;
  handleDelete?: () => void;
};

export function HistoricCard({
  data,
  enableSelect = false,
  isDeleted = false,
  handleDelete,
  ...rest
}: Props) {
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

  const create = dayjs(purchaseDay).format("DD/MMj/YYYY");

  return (
    <Container
      style={isSelected && selectCard}
      onPress={handleSelected}
      {...rest}
    >
      <Header>
        <MarketName>{marketName}</MarketName>
        {isDeleted ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
            <Trash size={24} color={COLORS.RED_500} />
          </TouchableOpacity>
        ) : data.isSync ? (
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
