import React, { useEffect } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Keyboard,
} from "react-native";
import { Container, Input, Search } from "./styles";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { useTheme } from "styled-components";

type Props = TouchableOpacityProps & {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChangeValue: (value: string) => void;
};

export function SearchButton({
  isOpen = false,
  onClose,
  onChangeValue,
  value,
  ...rest
}: Props) {
  const { COLORS } = useTheme();

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        onClose;
        onChangeValue("");
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isOpen) {
    return (
      <Search>
        <MagnifyingGlass size={28} color={COLORS.BRAND_MID} />
        <Input
          autoFocus
          returnKeyType="search"
          value={value}
          onChangeText={onChangeValue}
          onSubmitEditing={() => {
            onClose();
            onChangeValue("");
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onClose();
            onChangeValue("");
          }}
        >
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
