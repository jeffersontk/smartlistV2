import React from "react";
import { Container, Subtitle, Title } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { Content } from "../AddToList/styles";
import { Category } from "../../utils/enumCategory";
import { CustomInput } from "../../components/CustomInput";
import { CustomSelect } from "../../components/CustomSelect";
import { Button } from "../../components/Button";
import { SelectWithInput } from "../../components/SelectWithInput";

type routeParamsProps = {
  productName: string;
  category: keyof typeof Category;
};

export function AddToCart() {
  const route = useRoute();
  const { productName, category } = route.params as routeParamsProps;
  const { goBack } = useNavigation();
  function handleAddToCart() {
    goBack();
  }
  return (
    <Container>
      <Content>
        <Title>{productName}</Title>
        <Subtitle>{Category[category]}</Subtitle>

        <CustomInput label="Preço do produto" autoFocus />
        <SelectWithInput label="Quantidade" />

        <Button title="Adicionar ao carrinho" onPress={handleAddToCart} />
      </Content>
    </Container>
  );
}
