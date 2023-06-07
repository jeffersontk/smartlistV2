import React from "react";
import { Container, Title, Loading, Content } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { GoogleLogo } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { IconBoxProps } from "../ButtonIcon";

type props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  isGoogleButton?: boolean;
  icon?: IconBoxProps;
};

export function Button({
  title,
  isLoading = false,
  isGoogleButton = false,
  icon: Icon,
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
            {Icon && <Icon size={32} color={COLORS.WHITE} />}
            <Title type="google">{title}</Title>
          </Content>
        )}
      </Container>
    );
  }

  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>{title}</Title>
          {Icon && <Icon size={24} color={COLORS.WHITE} />}
        </>
      )}
    </Container>
  );
}
