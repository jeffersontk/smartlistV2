import "react-native-get-random-values";
import "./src/libs/dayjs";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { AppProvider } from "@realm/react";

import { REALM_APP_ID } from "@env";

import { Loading } from "./src/components/Loading";

import { getTheme } from "./src/theme/config";
import {
  CustomThemeProvider,
  useCustomTheme,
} from "./src/context/themeContext";
import Config from "./Config";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const { isDarkMode } = useCustomTheme();

  const theme = getTheme(isDarkMode);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <CustomThemeProvider>
        <Config />
      </CustomThemeProvider>
    </AppProvider>
  );
}
