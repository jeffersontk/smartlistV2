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
import { HeaderHome } from "../../components/HeaderHome";
import { CarStatus } from "../../components/CarStatus";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schema/Historic";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import { ChartBarHorizontal, ListBullets } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    []
  );
  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();
  const { COLORS } = useTheme();

  /* function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse._id.toString() });
    } else {
      navigate("departure");
    }
  } */

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert(
        "Veiculo em uso",
        "Não foi possível carregar o veiculo em uso."
      );
      console.log(error);
    }
  }

  function fetchHistoric() {
    const response = historic.filtered(
      "status = 'arrival' SORT(created_at DESC)"
    );
    const formattedHistoric = response.map((item) => {
      return {
        id: item._id!.toString(),
        licensePlate: item.license_plate,
        isSync: false,
        created: dayjs(item.created_at).format(
          "[Saida em] DD/MM/YYYY [às] HH:mm"
        ),
      };
    });

    setVehicleHistoric(formattedHistoric);
  }

  function handleStartPurchase() {
    navigate("startpurchase");
  }

  function handleMyList() {
    navigate("mylist");
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener("change", () => fetchVehicleInUse());
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener("change", fetchVehicleInUse);
      }
    };
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <Container>
      <HeaderHome />
      <Content>
        <Box>
          <NavigationButton activeOpacity={0.7} onPress={handleMyList}>
            <ListBullets size={28} color={COLORS.GRAY_100} />
            <Text>Minha lista</Text>
          </NavigationButton>
          <NavigationButton>
            <ChartBarHorizontal size={32} color={COLORS.GRAY_100} />
            <Text>Analises de compras</Text>
          </NavigationButton>
          <Title>Histórico</Title>
          {/*   <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item!.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum veículo utilizado</Label>}
        /> */}
          <HistoricCard activeOpacity={0.7} />
        </Box>
        <Button title=" Iniciar Compras" onPress={handleStartPurchase} />
      </Content>
    </Container>
  );
}
