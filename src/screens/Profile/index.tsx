import React, { useState } from "react";
import {
  Avatar,
  Container,
  Content,
  Name,
  AnimatedCircle,
  SwitchButton,
} from "./styles";
import { useApp, useUser } from "@realm/react";
import { Moon, SignOut, SunDim } from "phosphor-react-native";
import { Button } from "../../components/Button";
import { useCustomTheme } from "../../context/themeContext";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export function Profile() {
  const user = useUser();
  const app = useApp();
  const { toggleTheme, isDarkMode } = useCustomTheme();
  const [isActive, setIsActive] = useState(false);

  function handleSignOut() {
    app.currentUser?.logOut();
  }

  const handleButtonPress = () => {
    setIsActive(!isActive);
    toggleTheme();
  };
  const progress = useSharedValue(isActive ? 1 : 0);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value * 26 }],
    };
  });

  return (
    <Container>
      <Content>
        <Avatar
          source={{ uri: user?.profile.pictureUrl }}
          placeholder="L184i9offQof00ayfQay~qj[fQj["
        />

        <Name>{user?.profile.name}</Name>
        <SwitchButton isActive={isActive} onPress={handleButtonPress}>
          <AnimatedCircle isActive={isActive} style={circleStyle}>
            {isActive ? (
              <SunDim size={32} color="#f2f2f2" weight="bold" />
            ) : (
              <Moon size={32} color="#f2f2f2" weight="bold" />
            )}
          </AnimatedCircle>
        </SwitchButton>
      </Content>
      <Button title="Sair" icon={SignOut} onPress={handleSignOut} />
    </Container>
  );
}
