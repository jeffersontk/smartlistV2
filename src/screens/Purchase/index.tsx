import React from "react";
import { Container, Content } from "./styles";
import { HeaderPurchase } from "../../components/HeaderPurchase";
import { Product } from "../../components/Product";
import { CategoryList } from "../../components/CategoryList";

export function Purchase() {
  return (
    <Container>
      <HeaderPurchase title="Compras" />
      <Content>
        <CategoryList />
        <Product title="Arroz" />
        <Product title="Feijão" price="8.73" isCheck />
      </Content>
    </Container>
  );
}
