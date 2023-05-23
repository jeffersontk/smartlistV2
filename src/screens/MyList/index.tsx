import React from "react";
import { Container, Content, Footer } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components";
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
