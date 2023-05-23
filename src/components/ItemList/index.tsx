import React from "react";
import { Container, Info, Label, Text } from "./styles";
import { TouchableOpacity } from "react-native";
import { Trash } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { Category } from "../../utils/enumCategory";

type Props = {
  title: string;
  subtitle?: keyof typeof Category;
  handleDelete: () => void;
};

export function ItemList({ title, subtitle, handleDelete }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Info>
        <Label>{title}</Label>
        {subtitle && <Text>{Category[subtitle]}</Text>}
      </Info>
      <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
        <Trash size={32} color={COLORS.RED_500} />
      </TouchableOpacity>
    </Container>
  );
}
