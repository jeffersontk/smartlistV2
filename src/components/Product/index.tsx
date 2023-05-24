import React, { MutableRefObject, useRef } from "react";
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
  measurement?: string;
  isCheck?: boolean;
  status?: string;
  isCheckAtHome?: boolean;
  goToIHaveAtHome: () => void;
  onRemoveToIHaveAtHome: () => void;
};

export function Product({
  title,
  price,
  quantityAtHome,
  isCheck = false,
  isCheckAtHome = false,
  status,
  measurement,
  goToIHaveAtHome,
  onRemoveToIHaveAtHome,
  ...rest
}: Props) {
  const { COLORS } = useTheme();
  const swipeableRef = useRef<any>(null);

  function Checkbox() {
    if (isCheck) {
      return <CheckSquare size={32} color={COLORS.BRAND_LIGHT} />;
    } else {
      return <Square size={32} color={COLORS.GRAY_300} />;
    }
  }

  function handleIHaveAtHome() {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
    goToIHaveAtHome();
  }

  function handleEnabled() {
    onRemoveToIHaveAtHome();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }

  const handleIHave = () => {
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

  function handleEnabledButton() {
    return (
      <Button
        title="Desmarcar"
        onPress={handleEnabled}
        style={{
          maxWidth: 100,
          backgroundColor: COLORS.RED_500,
          marginRight: 16,
          marginTop: 5,
        }}
      />
    );
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={
        !isCheckAtHome && status !== "iNeed" ? handleIHave : handleEnabledButton
      }
    >
      <Container
        activeOpacity={0.7}
        {...rest}
        disabled={isCheckAtHome && status !== "iNeed"}
      >
        <Info>
          <Label isDisabled={isCheckAtHome && status !== "iNeed"}>
            {title}
          </Label>
          {price && (
            <Text>
              Preço unitário:
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(+price)}
            </Text>
          )}
          {quantityAtHome && (
            <Text>
              Quantidade em casa: {quantityAtHome} {measurement}
            </Text>
          )}
        </Info>
        {Checkbox()}
      </Container>
    </Swipeable>
  );
}
