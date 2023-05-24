import React, { useState } from "react";
import { Container, Content, Input, Label, Option, Select } from "./styles";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
  inputValue: string;
  selectValue: string;
  setInput: (value: string) => void;
  setSelect: (value: string) => void;
};
export function SelectWithInput({
  label,
  inputValue = "1",
  selectValue,
  setInput,
  setSelect,
}: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>{label}</Label>
      <Content>
        <Input
          autoCapitalize="characters"
          keyboardType="number-pad"
          value={inputValue}
          onChangeText={setInput}
          placeholderTextColor={COLORS.GRAY_400}
        />
        <Select
          dropdownIconColor={COLORS.BRAND_MID}
          selectedValue={selectValue}
          onValueChange={(itemValue: any) => {
            setSelect(itemValue);
          }}
        >
          <Option label="Unidade" value="unidade" style={{ fontSize: 21 }} />
          <Option label="Kg" value="kg" style={{ fontSize: 21 }} />
          <Option label="Mg" value="mg" style={{ fontSize: 21 }} />
          <Option label="g" value="g" style={{ fontSize: 21 }} />
          <Option label="Litros" value="litros" style={{ fontSize: 21 }} />
        </Select>
      </Content>
    </Container>
  );
}
