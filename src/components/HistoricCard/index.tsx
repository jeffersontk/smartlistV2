import React from "react";
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

export type HistoricCardProps = {
  id: string;
  licensePlate: string;
  created: string;
  isSync: boolean;
};

type Props = TouchableOpacityProps & {
  data?: HistoricCardProps;
};

export function HistoricCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container {...rest}>
      <Header>
        <MarketName>Guanabara</MarketName>
        <ContentDate>
          <Clock size={16} color={COLORS.GRAY_400} />
          <PurchaseDay>21/05/2023</PurchaseDay>
        </ContentDate>
      </Header>
      <Text>Valor da compra: R$ 896,72</Text>
      <Text>Quantidade de items: 154</Text>
      <Text>Pagamento: Vale Alimentação</Text>
    </Container>
  );
}
