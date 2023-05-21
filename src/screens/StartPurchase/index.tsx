import React from "react";
import { Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { CustomInput } from "../../components/CustomInput";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export function StartPurchase() {
  const { navigate } = useNavigation();
  function handlePurchase() {
    navigate("Mercearia");
  }

  return (
    <Container>
      <Header title="Iniciar compras" />
      <Content>
        <CustomInput
          label="Qual mercado você esta?"
          placeholder="supermercado"
        />
        <Button title="Começar" onPress={handlePurchase} />
      </Content>
    </Container>
  );
}
