import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
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
import { HistoricCard } from "../../components/HistoricCard";
import {
  ChartBarHorizontal,
  CloudArrowUp,
  ListBullets,
} from "phosphor-react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { usePurchase } from "../../context/purchase";
import { Purchase } from "../../libs/realm/schema/Purchase";
import { useUser } from "@realm/react";
import {
  getLastAsyncTimestamp,
  saveLastSyncTimestamp,
} from "../../libs/asyncStorage/syncStorage";
import { HistoricCardProps } from "../../components/HistoricCard";

export function Home() {
  const { navigate } = useNavigation();
  const { purchase } = usePurchase();
  const { COLORS } = useTheme();
  const [historic, setHistoric] = useState<HistoricCardProps[]>([]);
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);
  const realm = useRealm();
  const user = useUser();

  const historicPurchase = useQuery(Purchase);

  function handleStartPurchase() {
    navigate("startpurchase");
  }

  function handlePurchase() {
    navigate("Condimentos", { category: "grocery" });
  }

  function handleMyList() {
    navigate("mylist");
  }

  function handleDetailsPurchase(item: HistoricCardProps) {
    navigate("purchasedetails", item);
  }

  function handleSelectPurchasesForAnalysis() {
    navigate("selectpurchases");
  }

  async function fetchHistoricPurchase() {
    try {
      const response = historicPurchase.sorted("created_at", true);

      const lastSync = await getLastAsyncTimestamp();

      const formatedHistoric = response.map((item) => {
        return {
          id: item._id,
          marketName: item.marketName,
          purchaseDay: item.created_at,
          purchaseValue: item.purchaseValue,
          quantityItems: item.amountProducts,
          paymentMethod: item.paymentMethod,
          cart: item.cart,
          isSync: lastSync > item.created_at!.getTime(),
        };
      });
      setHistoric(formatedHistoric);
    } catch (error) {}
  }

  async function progressNotification(
    transferred: number,
    transferable: number
  ) {
    const percentage = (transferred / transferable) * 100;

    if (percentage === 100) {
      await saveLastSyncTimestamp();
      await fetchHistoricPurchase();
      Toast.show({
        text1: "Todos os dados estão sincronizados.",
        type: "info",
      });
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado. `);
    }
  }

  useEffect(() => {
    fetchHistoricPurchase();
  }, [historicPurchase]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Purchase")
        .filtered(`user_id = '${user!.id}'`);
      const productByUserQuery = realm
        .objects("Product")
        .filtered(`user_id = '${user!.id}'`);

      const cartByUserQuery = realm
        .objects("Cart")
        .filtered(`user_id = '${user!.id}'`);

      mutableSubs.add(historicByUserQuery, { name: "historic_by_user" });
      mutableSubs.add(productByUserQuery, { name: "product_by_user" });
      mutableSubs.add(cartByUserQuery, { name: "cart_by_user" });
    });
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;
    if (!syncSession) {
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <>
      {percentageToSync &&
        Toast.show({
          text1: percentageToSync,
          type: "info",
        })}

      <Container>
        <Content>
          <Box>
            <NavigationButton activeOpacity={0.7} onPress={handleMyList}>
              <ListBullets size={28} color={COLORS.TITLE_SECONDARY} />
              <Text>Minha lista</Text>
            </NavigationButton>
            {/* <NavigationButton
            activeOpacity={0.7}
            onPress={handleSelectPurchasesForAnalysis}
          >
            <ChartBarHorizontal size={32} color={COLORS.GRAY_100} />
            <Text>Analises de compras</Text>
          </NavigationButton> */}
            <Title>Histórico</Title>
            <FlatList
              data={historic}
              keyExtractor={(item) => String(item.id)}
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
    </>
  );
}
