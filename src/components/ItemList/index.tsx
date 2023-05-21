import React from "react";
import { Container, Info, Label, Text } from "./styles";
import { TouchableOpacity } from "react-native";
import { Trash } from "phosphor-react-native";
import { useTheme } from "styled-components";

type Props = {
  title: string;
  subtitle?: string;
  handleDelete: () => void;
};

export function ItemList({ title, subtitle, handleDelete }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Info>
        <Label>{title}</Label>
        {subtitle && <Text>{subtitle}</Text>}
      </Info>
      <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
        <Trash size={32} color={COLORS.RED_500} />
      </TouchableOpacity>
    </Container>
  );
}
