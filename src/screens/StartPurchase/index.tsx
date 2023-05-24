import React, { useRef, useState } from "react";
import { Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { CustomInput } from "../../components/CustomInput";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "../../components/RadioButton";
import { usePurchase } from "../../context/purchase";
import { Alert, TextInput } from "react-native";

export function StartPurchase() {
  const { navigate } = useNavigation();
  const [typeList, setTypeList] = useState<string>("myList");
  const { startPurchase, purchase } = usePurchase();
  const [marketName, setMarketName] = useState(purchase.marketName);

  const marketNameRef = useRef<TextInput>(null);

  function handlePurchase() {
    if (!marketName) {
      marketNameRef.current?.focus();
      Alert.alert("Campo vazio", "Informe qual mercado você esta.");
    } else {
      startPurchase(marketName, typeList);
      navigate("Mercearia", { category: "grocery" });
    }
  }

  const handleOptionSelect = (option: string) => {
    setTypeList(option);
  };

  return (
    <Container>
      <Content>
        <CustomInput
          ref={marketNameRef}
          label="Qual mercado você esta?"
          placeholder="supermercado"
          onChangeText={setMarketName}
          value={purchase.marketName}
        />
        <RadioButton
          label="Usar minha lista"
          selected={typeList === "myList"}
          onSelect={handleOptionSelect}
          value="myList"
        />
        <RadioButton
          label="Usar lista sugerida"
          selected={typeList === "suggestedList"}
          onSelect={handleOptionSelect}
          value="suggestedList"
        />

        <Button title="Começar" onPress={handlePurchase} />
      </Content>
    </Container>
  );
}
