import { TextInputProps, TextInput } from "react-native";
import { forwardRef, useState } from "react";
import { Container, Select, Label, Option, Content } from "./styles";
import { useTheme } from "styled-components";
import { CaretDown } from "phosphor-react-native";
import { categories } from "../../data/categories";

type Props = TextInputProps & {
  label: string;
};

const CustomSelect = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Container>
      <Label>{label}</Label>
      <Content>
        <Select
          dropdownIconColor={COLORS.BRAND_MID}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue: any) => {
            setSelectedLanguage(itemValue);
          }}
        >
          <Option
            label="selecione uma categoria"
            enabled={false}
            style={{ fontSize: 21 }}
          />
          {categories.map((item) => (
            <Option
              key={item.id}
              label={item.name}
              value={item.category}
              style={{ fontSize: 21 }}
            />
          ))}
        </Select>
      </Content>
    </Container>
  );
});

export { CustomSelect };
