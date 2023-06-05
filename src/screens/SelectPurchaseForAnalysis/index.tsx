import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Content } from "./styles";
import { HistoricCard } from "../../components/HistoricCard";
import { Button } from "../../components/Button";
import { fakeHistoric } from "../../data/fakeHistoric";
import { Label } from "../Home/styles";
import { useQuery } from "../../libs/realm";
import { Purchase } from "../../libs/realm/schema/Purchase";

export function SelectPurchaseForAnalysis() {
  const [historic, setHistoric] = useState<Purchase[]>([]);

  const { navigate } = useNavigation();
  const historicPurchase = useQuery(Purchase);

  function handlePurchasingAnalysis() {
    navigate("purchasingAnalysis");
  }

  function fetchHistoricPurchase() {
    const filteredHistoricPurchase = historicPurchase
      .sorted([["_id", true]])
      .slice(0, 10);
    setHistoric(filteredHistoricPurchase);
  }

  useEffect(() => {
    fetchHistoricPurchase();
  }, []);

  return (
    <Container>
      <Content>
        <FlatList
          data={historic}
          keyExtractor={(item) => String(item._id)}
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
