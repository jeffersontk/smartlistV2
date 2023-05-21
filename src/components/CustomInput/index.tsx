import { TextInputProps, TextInput } from "react-native";
import { forwardRef } from "react";
import { Container, Input, Label } from "./styles";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  label: string;
};

const CustomInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        ref={ref}
        autoCapitalize="characters"
        returnKeyType="send"
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  );
});

export { CustomInput };
