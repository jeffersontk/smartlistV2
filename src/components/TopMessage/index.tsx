import React from "react";
import { Container, Message, Title } from "./styles";
import { IconBoxProps } from "../ButtonIcon";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  icon?: IconBoxProps;
  title: string;
};

export function TopMessage({ title, icon: Icon }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top;

  return (
    <Container style={{ paddingTop }}>
      <Message>
        {Icon && <Icon size={18} color={COLORS.GRAY_100} />}
        <Title>{title}</Title>
      </Message>
    </Container>
  );
}
