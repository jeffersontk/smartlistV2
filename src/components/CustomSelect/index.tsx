import { TextInputProps, TextInput } from "react-native";
import { forwardRef } from "react";
import { Container, Select, Label, Option, Content } from "./styles";
import { useTheme } from "styled-components";
import { categories } from "../../data/categories";

type Props = TextInputProps & {
  label: string;
  onValueChange: (value: string) => void;
  value: string;
};

const CustomSelect = forwardRef<TextInput, Props>(
  ({ label, onValueChange, value }, ref) => {
    const { COLORS } = useTheme();

    return (
      <Container ref={ref}>
        <Label>{label}</Label>
        <Content>
          <Select
            dropdownIconColor={COLORS.BRAND_MID}
            selectedValue={value}
            onValueChange={(itemValue: any) => {
              onValueChange(itemValue);
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
  }
);

export { CustomSelect };
