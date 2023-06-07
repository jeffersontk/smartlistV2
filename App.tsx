import "react-native-get-random-values";
import "./src/libs/dayjs";

import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, UserProvider } from "@realm/react";

import { REALM_APP_ID } from "@env";

import { SignIn } from "./src/screens/SignIn";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { RealmProvider, syncConfig } from "./src/libs/realm";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PurchaseProvider from "./src/context/purchase";
import { TopMessage } from "./src/components/TopMessage";
import { WifiSlash } from "phosphor-react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { getTheme } from "./src/theme/config";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const netInfo = useNetInfo();
  const isDarkTheme = true;
  const theme = getTheme(isDarkTheme);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider
            style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
          >
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />
            {!netInfo.isConnected && (
              <TopMessage title="Você esta Off-line" icon={WifiSlash} />
            )}
            <UserProvider fallback={SignIn}>
              <RealmProvider sync={syncConfig} fallback={Loading}>
                <PurchaseProvider>
                  <Routes />
                </PurchaseProvider>
              </RealmProvider>
            </UserProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AppProvider>
  );
}
