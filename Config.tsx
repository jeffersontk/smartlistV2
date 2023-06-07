import { View, Text } from "react-native";
import React from "react";

import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WifiSlash } from "phosphor-react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import PurchaseProvider from "./src/context/purchase";
import { RealmProvider, syncConfig } from "./src/libs/realm";
import { useCustomTheme } from "./src/context/themeContext";
import { getTheme } from "./src/theme/config";
import { TopMessage } from "./src/components/TopMessage";
import { SignIn } from "./src/screens/SignIn";
import { UserProvider } from "@realm/react";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";

export default function Config() {
  const { isDarkMode } = useCustomTheme();
  const theme = getTheme(isDarkMode);
  const netInfo = useNetInfo();

  return (
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
  );
}
