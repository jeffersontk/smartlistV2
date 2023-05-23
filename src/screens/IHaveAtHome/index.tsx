import React, { useState } from "react";
import { Container, Subtitle, Title } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { Content } from "../AddToList/styles";
import { Category } from "../../utils/enumCategory";
import { Button } from "../../components/Button";
import { SelectWithInput } from "../../components/SelectWithInput";
import { RadioButton } from "../../components/RadioButton";

type routeParamsProps = {
  productName: string;
  category: keyof typeof Category;
};

export function IHaveAtHome() {
  const route = useRoute();
  const { productName, category } = route.params as routeParamsProps;
  const { goBack } = useNavigation();
  function handleAddToCart() {
    goBack();
  }
  const [selectedOption, setSelectedOption] = useState("iNeed");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Container>
      <Content>
        <Title>{productName}</Title>
        <Subtitle>{Category[category]}</Subtitle>

        <SelectWithInput label="Quantidade" />

        <RadioButton
          label="Tenho em casa, mas preciso comprar"
          selected={selectedOption === "iNeed"}
          onSelect={handleOptionSelect}
          value="iNeed"
        />
        <RadioButton
          label="Tenho em casa, não preciso comprar"
          selected={selectedOption === "iDontNeed"}
          onSelect={handleOptionSelect}
          value="iDontNeed"
        />

        <Button title="Adicionar ao carrinho" onPress={handleAddToCart} />
      </Content>
    </Container>
  );
}
