import React from "react";
import { Container, Info, Label, Text } from "./styles";
import { CheckSquare, Square } from "phosphor-react-native";
import { useTheme } from "styled-components";

type Props = {
  title: string;
  price?: string;
  isCheck?: boolean;
};

export function Product({ title, price, isCheck = false }: Props) {
  const { COLORS } = useTheme();
  function Checkbox() {
    if (isCheck) {
      return <CheckSquare size={32} color={COLORS.BRAND_LIGHT} />;
    } else {
      return <Square size={32} color={COLORS.GRAY_300} />;
    }
  }

  return (
    <Container activeOpacity={0.7}>
      <Info>
        <Label>{title}</Label>
        {price && <Text>Preço unitário: R$ {+price}</Text>}
      </Info>
      {Checkbox()}
    </Container>
  );
}
