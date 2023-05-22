import React, { useState } from "react";
import {
  Box,
  Container,
  Content,
  ItemCart,
  Name,
  Price,
  Quantity,
  Title,
  TotalInCart,
  TotalPrice,
} from "./styles";
import { Header } from "../../components/Header";
import { SearchButton } from "../../components/SearchButton";
import { Button } from "../../components/Button";

export function Cart() {
  const [searchOpen, setSearchOpen] = useState(false);

  function handleSearchOpen() {
    setSearchOpen(!searchOpen);
  }
  return (
    <Container>
      <Header title="Carrinho" />
      <Content>
        <TotalInCart>
          <Title>Total no carrinho</Title>
          <TotalPrice>R$ 1999.99</TotalPrice>
        </TotalInCart>

        <Box>
          <ItemCart>
            <Name>Arroz</Name>
            <Quantity>3 kg</Quantity>
            <Price>R$ 8.32</Price>
          </ItemCart>
        </Box>
        <SearchButton
          isOpen={searchOpen}
          onPress={handleSearchOpen}
          onClose={() => setSearchOpen(false)}
        />
        <Button title="Finalizar compras" />
      </Content>
    </Container>
  );
}
