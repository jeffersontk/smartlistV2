import { TextInputProps, TextInput } from "react-native";
import { forwardRef } from "react";
import { Container, Select, Label, Option, Content } from "./styles";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  label: string;
  onValueChange: (value: string) => void;
  value: string;
};

const CustomSelectPayment = forwardRef<TextInput, Props>(
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
              label="selecione forma de pagamento"
              enabled={false}
              style={{ fontSize: 21 }}
            />
            <Option
              value="vale alimentacao"
              label="Vale Alimentação"
              style={{ fontSize: 21 }}
            />
            <Option
              value="vale alimentacao + pix"
              label="Vale Alimentação + Pix"
              style={{ fontSize: 21 }}
            />
            <Option
              value="vale alimentacao + credito"
              label="Vale Alimentação + crédito"
              style={{ fontSize: 21 }}
            />
            <Option
              value="vale alimentacao + debito"
              label="Vale Alimentação + Debito"
              style={{ fontSize: 21 }}
            />
            <Option value="pix" label="Pix" style={{ fontSize: 21 }} />
            <Option value="credito" label="Crédito" style={{ fontSize: 21 }} />
            <Option value="debito" label="Debito" style={{ fontSize: 21 }} />
            <Option
              value="dinheiro"
              label="Dinheiro/cédula"
              style={{ fontSize: 21 }}
            />
          </Select>
        </Content>
      </Container>
    );
  }
);

export { CustomSelectPayment };
