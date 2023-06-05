import React, { useEffect, useState } from "react";
import { Container, Subtitle, Title } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Content } from "../AddToList/styles";
import { Category } from "../../utils/enumCategory";
import { CustomInput } from "../../components/CustomInput";
import { Button } from "../../components/Button";
import { SelectWithInput } from "../../components/SelectWithInput";
import { usePurchase } from "../../context/purchase";
import { Realm } from "@realm/react";

type routeParamsProps = {
  productName: string;
  category: keyof typeof Category;
  id: Realm.BSON.UUID;
};

export function AddToCart() {
  const route = useRoute();
  const { productName, category, id } = route.params as routeParamsProps;
  const { goBack } = useNavigation();
  const { addToCart } = usePurchase();

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [measurement, setMeasurement] = useState("unidade");

  function handleAddToCart() {
    addToCart(id, productName, category, price, quantity, measurement);
    goBack();
  }

  return (
    <Container>
      <Content>
        <Title>{productName}</Title>
        <Subtitle>{Category[category]}</Subtitle>

        <CustomInput
          label="Preço do produto"
          autoFocus
          onChangeText={setPrice}
          keyboardType="number-pad"
          value={price}
        />
        <SelectWithInput
          label="Quantidade"
          inputValue={quantity}
          setInput={setQuantity}
          selectValue={measurement}
          setSelect={setMeasurement}
        />

        <Button title="Adicionar ao carrinho" onPress={handleAddToCart} />
      </Content>
    </Container>
  );
}
