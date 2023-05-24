import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useUser } from "@realm/react";
import { Container, Content, Title } from "./styles";
import { CustomInput } from "../../components/CustomInput";
import { CustomSelect } from "../../components/CustomSelect";
import { ItemList } from "../../components/ItemList";
import { Button } from "../../components/Button";
import { useQuery, useRealm } from "../../libs/realm";
import { Product } from "../../libs/realm/schema/Product";
import { Category } from "../../utils/enumCategory";

export function AddToList() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const realm = useRealm();

  const products = useQuery(Product);
  const filteredProducts = products.sorted([["_id", true]]).slice(0, 10);

  const user = useUser();

  const nameRef = useRef<TextInput>(null);
  const categoryRef = useRef<TextInput>(null);

  function handleProductRegister() {
    try {
      if (name.length === 0) {
        nameRef.current?.focus();
        return Alert.alert("Campo invalido", "O campo devem ser preenchidos");
      }
      if (category.length === 0) {
        categoryRef.current?.focus();
        return Alert.alert("Campo invalido", "O campo devem ser preenchidos");
      }
      realm.write(() => {
        realm.create(
          "Product",
          Product.generate({
            category,
            name,
            user_id: user!.id,
          })
        );
      });

      setName("");
      setCategory("");
    } catch (error) {}
  }

  function handleDelete(item: Product) {
    realm.write(() => {
      realm.delete(item);
    });
  }

  return (
    <Container>
      <Content>
        <Title>Novo Produto</Title>
        <CustomInput
          ref={nameRef}
          label="Nome do produto"
          returnKeyType="next"
          onChangeText={setName}
          value={name}
        />
        <CustomSelect
          ref={categoryRef}
          label="Categoria"
          value={category}
          onValueChange={setCategory}
        />

        <Button title="Adicionar a lista" onPress={handleProductRegister} />
        <Title>Recém-adicionados</Title>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => String(item!._id)}
          renderItem={({ item }) => (
            <ItemList
              handleDelete={() => handleDelete(item)}
              title={item.name}
              subtitle={item.category as keyof typeof Category}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}
