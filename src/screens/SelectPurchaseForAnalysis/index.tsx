import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Content } from "./styles";
import { HistoricCard } from "../../components/HistoricCard";
import { Button } from "../../components/Button";
import { fakeHistoric } from "../../data/fakeHistoric";
import { Label } from "../Home/styles";

export function SelectPurchaseForAnalysis() {
  const { navigate } = useNavigation();

  function handlePurchasingAnalysis() {
    navigate("purchasingAnalysis");
  }
  return (
    <Container>
      <Content>
        <FlatList
          data={fakeHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard activeOpacity={0.7} data={item} enableSelect />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Label>Nenhuma compra realizada</Label>}
        />
      </Content>
      <Button title="Analisar" onPress={handlePurchasingAnalysis} />
    </Container>
  );
}
