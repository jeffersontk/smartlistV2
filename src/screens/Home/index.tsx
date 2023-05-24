import React, { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Container,
  Content,
  Label,
  NavigationButton,
  Text,
  Title,
} from "./styles";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schema/Historic";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import { ChartBarHorizontal, ListBullets } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { fakeHistoric } from "../../data/fakeHistoric";
import { usePurchase } from "../../context/purchase";
import { Purchase } from "../../libs/realm/schema/Purchase";

export function Home() {
  const { navigate } = useNavigation();
  const { purchase } = usePurchase();
  const { COLORS } = useTheme();

  const historicPurchase = useQuery(Purchase);
  const filteredHistoricPurchase = historicPurchase
    .sorted([["_id", true]])
    .slice(0, 10);

  function handleStartPurchase() {
    navigate("startpurchase");
  }
  function handlePurchase() {
    navigate("Condimentos", { category: "grocery" });
  }

  function handleMyList() {
    navigate("mylist");
  }

  function handleDetailsPurchase(item: Purchase) {
    navigate("purchasedetails", item);
  }

  function handleSelectPurchasesForAnalysis() {
    navigate("selectpurchases");
  }

  return (
    <Container>
      <Content>
        <Box>
          <NavigationButton activeOpacity={0.7} onPress={handleMyList}>
            <ListBullets size={28} color={COLORS.GRAY_100} />
            <Text>Minha lista</Text>
          </NavigationButton>
          <NavigationButton
            activeOpacity={0.7}
            onPress={handleSelectPurchasesForAnalysis}
          >
            <ChartBarHorizontal size={32} color={COLORS.GRAY_100} />
            <Text>Analises de compras</Text>
          </NavigationButton>
          <Title>Histórico</Title>
          <FlatList
            data={filteredHistoricPurchase}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => (
              <HistoricCard
                data={item}
                onPress={() => handleDetailsPurchase(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Label>Nenhuma compra realizada</Label>}
          />
        </Box>
        {Object.keys(purchase).length > 0 ? (
          <Button title="Voltar as compras" onPress={handlePurchase} />
        ) : (
          <Button title="Iniciar Compras" onPress={handleStartPurchase} />
        )}
      </Content>
    </Container>
  );
}
