import React, { useState } from "react";
import { Container, Subtitle, Title } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { Content } from "../AddToList/styles";
import { Category } from "../../utils/enumCategory";
import { Button } from "../../components/Button";
import { SelectWithInput } from "../../components/SelectWithInput";
import { RadioButton } from "../../components/RadioButton";
import { usePurchase } from "../../context/purchase";

type routeParamsProps = {
  id: string;
  productName: string;
  category: keyof typeof Category;
};

export function IHaveAtHome() {
  const route = useRoute();
  const { id, productName, category } = route.params as routeParamsProps;
  const [quantity, setQuantity] = useState("1");
  const [measurement, setMeasurement] = useState("unidade");
  const [selectedOption, setSelectedOption] = useState("iNeed");

  const { goBack } = useNavigation();
  const { addToIHaveAtHomeList } = usePurchase();

  function handleAddToCart() {
    addToIHaveAtHomeList(
      id,
      productName,
      category,
      quantity,
      measurement,
      selectedOption,
      true
    );

    goBack();
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Container>
      <Title>{productName}</Title>
      <Subtitle>{Category[category]}</Subtitle>

      <SelectWithInput
        label="Quantidade"
        inputValue={quantity}
        setInput={setQuantity}
        selectValue={measurement}
        setSelect={setMeasurement}
      />

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

      <Button title="Marcar produto" onPress={handleAddToCart} />
    </Container>
  );
}
