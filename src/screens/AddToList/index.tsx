import React from "react";
import { Container, Content, Title } from "./styles";
import { Header } from "../../components/Header";
import { CustomInput } from "../../components/CustomInput";
import { CustomSelect } from "../../components/CustomSelect";
import { ItemList } from "../../components/ItemList";
import { Button } from "../../components/Button";

export function AddToList() {
  function handleDelete() {
    console.log("delete");
  }
  return (
    <Container>
      <Header title="Adicionar a lista" />
      <Content>
        <Title>Novo Produto</Title>
        <CustomInput label="Nome do produto" />
        <CustomSelect label="Categoria" />

        <Button title="Adicionar a lista" />
        <Title>Recém-adicionados</Title>

        <ItemList
          handleDelete={handleDelete}
          title="Arroz"
          subtitle="Mercearia"
        />
      </Content>
    </Container>
  );
}
