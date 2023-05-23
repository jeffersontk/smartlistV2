import React, { useState } from "react";
import { Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { CustomInput } from "../../components/CustomInput";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "../../components/RadioButton";

export function StartPurchase() {
  const { navigate } = useNavigation();
  function handlePurchase() {
    navigate("Mercearia", { category: "grocery" });
  }
  const [selectedOption, setSelectedOption] = useState("myList");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Container>
      <Content>
        <CustomInput
          label="Qual mercado você esta?"
          placeholder="supermercado"
        />
        <RadioButton
          label="Usar minha lista"
          selected={selectedOption === "myList"}
          onSelect={handleOptionSelect}
          value="myList"
        />
        <RadioButton
          label="Usar lista sugerida"
          selected={selectedOption === "suggestedList"}
          onSelect={handleOptionSelect}
          value="suggestedList"
        />

        <Button title="Começar" onPress={handlePurchase} />
      </Content>
    </Container>
  );
}
