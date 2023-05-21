import React from "react";
import { Container, Content, Footer } from "./styles";
import { Header } from "../../components/Header";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Plus, Trash } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ItemList } from "../../components/ItemList";

export function MyList() {
  const { COLORS } = useTheme();
  const { navigate } = useNavigation();

  function handleDelete() {
    console.log("delete");
  }

  function handleAddToList() {
    navigate("addtolist");
  }

  return (
    <Container>
      <Header title="Minha lista" />
      <Content>
        <ItemList
          handleDelete={handleDelete}
          title="Arroz"
          subtitle="Mercearia"
        />
      </Content>
      <Footer>
        <ButtonIcon icon={Plus} onPress={handleAddToList} />
      </Footer>
    </Container>
  );
}
