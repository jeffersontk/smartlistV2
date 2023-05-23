import React from "react";
import { TouchableOpacityProps } from "react-native";
import {
  Circle,
  CircleSelected,
  Container,
  InternalCircle,
  Label,
} from "./styles";

type RadioButtonProps = TouchableOpacityProps & {
  label: string;
  value: string;
  selected?: boolean;
  onSelect: (value: string) => void;
};

export function RadioButton({
  label,
  onSelect,
  selected = false,
  value,
}: RadioButtonProps) {
  return (
    <Container onPress={() => onSelect(value)}>
      {selected ? (
        <CircleSelected>
          <InternalCircle />
        </CircleSelected>
      ) : (
        <Circle />
      )}
      <Label>{label}</Label>
    </Container>
  );
}
