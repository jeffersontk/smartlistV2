import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Realm, useApp } from "@realm/react";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { Container, Slogan, Title } from "./styles";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const app = useApp();

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  const handleGoogleSignIn = () => {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.idToken) {
        /* fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`
        )
          .then((response) => response.json())
          .then(console.log); */
        console.log(
          "response.authentication.idToken",
          response.authentication.idToken
        );
        const credentials = Realm.Credentials.jwt(
          response.authentication.idToken
        );
        console.log("credentials", credentials);
        app.logIn(credentials).catch((error) => {
          console.log(error);
          Alert.alert(
            "Entrar",
            "Não foi possível conectar-se a sua conta Google."
          );
        });
        setIsAuthenticating(false);
        /*  console.log("response.authentication", response.authentication);
        console.log("idToken", response.authentication.idToken);
        const credentials = Realm.Credentials.jwt(
          response.authentication.idToken
        );
        console.log("credentials", credentials);

        app.logIn(credentials).catch((error) => {
          console.log(error);
          Alert.alert(
            "Entrar",
            "Não foi possível conectar-se a sua conta Google."
          );
          setIsAuthenticating(false);
        }); */
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possível conectar-se a sua conta Google."
        );
        setIsAuthenticating(false);
      }
    }
  }, [response]);

  return (
    <Container source={backgroundImg}>
      <Button
        title="Entrar com google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
