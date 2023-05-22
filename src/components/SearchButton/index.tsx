import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Container, Input, Search } from "./styles";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { useTheme } from "styled-components";

type Props = TouchableOpacityProps & {
  isOpen?: boolean;
  onClose?: () => void;
};

export function SearchButton({ isOpen = false, onClose, ...rest }: Props) {
  const { COLORS } = useTheme();
  if (isOpen) {
    return (
      <Search>
        <MagnifyingGlass size={28} color={COLORS.BRAND_MID} />
        <Input autoFocus autoCapitalize="characters" returnKeyType="search" />
        <TouchableOpacity onPress={onClose}>
          <X size={28} color={COLORS.GRAY_400} />
        </TouchableOpacity>
      </Search>
    );
  }
  return (
    <Container activeOpacity={0.7} {...rest}>
      <MagnifyingGlass size={28} color={COLORS.BRAND_MID} />
    </Container>
  );
}
