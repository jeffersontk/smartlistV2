import React, { useState } from "react";
import { Box, Container, Content } from "./styles";
import { HeaderPurchase } from "../../components/HeaderPurchase";
import { Product } from "../../components/Product";
import { CategoryList } from "../../components/CategoryList";
import { SearchButton } from "../../components/SearchButton";

export function Purchase() {
  const [searchOpen, setSearchOpen] = useState(false);

  function handleSearchOpen() {
    setSearchOpen(!searchOpen);
  }

  return (
    <Container>
      <HeaderPurchase title="Compras" />
      <Content>
        <CategoryList />
        <Box>
          <Product title="Arroz" />
          <Product title="Feijão" price="8.73" isCheck />
        </Box>
        <SearchButton
          isOpen={searchOpen}
          onPress={handleSearchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </Content>
    </Container>
  );
}
