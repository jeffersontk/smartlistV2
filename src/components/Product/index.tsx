import React, { MutableRefObject } from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Info, Label, Text } from "./styles";
import { CheckSquare, Square } from "phosphor-react-native";
import { useTheme } from "styled-components";

import { Swipeable } from "react-native-gesture-handler";
import { Button } from "../Button";

type Props = TouchableOpacityProps & {
  title: string;
  price?: string;
  quantityAtHome?: string;
  isCheck?: boolean;
  swipeableRef: MutableRefObject<any>;
  goToIHaveAtHome: () => void;
};

export function Product({
  title,
  price,
  quantityAtHome,
  isCheck = false,
  swipeableRef,
  goToIHaveAtHome,
  ...rest
}: Props) {
  const { COLORS } = useTheme();
  function Checkbox() {
    if (isCheck) {
      return <CheckSquare size={32} color={COLORS.BRAND_LIGHT} />;
    } else {
      return <Square size={32} color={COLORS.GRAY_300} />;
    }
  }

  function handleIHaveAtHome() {
    swipeableRef.current.close();
    goToIHaveAtHome();
  }

  const LeftSwipeActions = () => {
    return (
      <Button
        title="Ja tenho"
        onPress={handleIHaveAtHome}
        style={{
          maxWidth: 100,
          backgroundColor: COLORS.RED_500,
          marginRight: 16,
          marginTop: 5,
        }}
      />
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={LeftSwipeActions}>
      <Container activeOpacity={0.7} {...rest}>
        <Info>
          <Label>{title}</Label>
          {price && <Text>Preço unitário: R$ {+price}</Text>}
          {quantityAtHome && (
            <Text>Quantidade em casa: R$ {quantityAtHome}</Text>
          )}
        </Info>
        {Checkbox()}
      </Container>
    </Swipeable>
  );
}
