import React, { useState } from "react";
import { Container, Content, Input, Label, Option, Select } from "./styles";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
};
export function SelectWithInput({ label }: Props) {
  const { COLORS } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Container>
      <Label>{label}</Label>
      <Content>
        <Input
          autoCapitalize="characters"
          value="1"
          placeholderTextColor={COLORS.GRAY_400}
        />
        <Select
          dropdownIconColor={COLORS.BRAND_MID}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue: any) => {
            setSelectedLanguage(itemValue);
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
