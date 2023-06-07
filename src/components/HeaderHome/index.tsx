import { SignOut } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Container, Greeting, Message, Name, Picture } from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

export function HeaderHome() {
  const user = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { navigate } = useNavigation();

  const paddingTop = insets.top + 32;

  function handleSignOut() {
    app.currentUser?.logOut();
  }

  function handleToProfile() {
    navigate("profile");
  }

  return (
    <Container style={{ paddingTop }} onPress={handleToProfile}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>{user?.profile.name}</Name>
      </Greeting>
      {/* <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
        <SignOut size={32} color={theme.COLORS.WHITE} weight="fill" />
      </TouchableOpacity> */}
    </Container>
  );
}
