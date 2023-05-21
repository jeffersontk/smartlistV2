import React from "react";
import { Container, Title, Loading, Content } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { GoogleLogo } from "phosphor-react-native";
import { useTheme } from "styled-components";

type props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  isGoogleButton?: boolean;
};

export function Button({
  title,
  isLoading = false,
  isGoogleButton = false,
  ...rest
}: props) {
  const { COLORS } = useTheme();
  if (isGoogleButton) {
    return (
      <Container
        activeOpacity={0.7}
        disabled={isLoading}
        type="google"
        {...rest}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Content>
            <GoogleLogo size={32} color={COLORS.BRAND_MID} />
            <Title type="google">{title}</Title>
          </Content>
        )}
      </Container>
    );
  }

  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  );
}
