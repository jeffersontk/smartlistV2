import React, { MutableRefObject } from "react";
import { useTheme } from "styled-components";
import { Swipeable } from "react-native-gesture-handler";
import { Container, Name, Price, Quantity } from "./styles";
import { Button } from "../Button";
import { usePurchase } from "../../context/purchase";

type Props = {
  productName: string;
  quantity: string;
  measurement: string;
  price: string;
  swipeableRef?: MutableRefObject<any>;
  onRemove: () => void;
};

export function ItemCart({
  measurement,
  price,
  productName,
  quantity,
  swipeableRef,
  onRemove,
}: Props) {
  const { COLORS } = useTheme();

  const LeftSwipeActions = () => {
    return (
      <Button
        title="Remover"
        onPress={onRemove}
        style={{
          maxWidth: 100,
          backgroundColor: COLORS.RED_500,
          marginRight: 16,
          marginTop: 2,
        }}
      />
    );
  };
  return (
    <Swipeable ref={swipeableRef} renderLeftActions={LeftSwipeActions}>
      <Container>
        <Name>{productName}</Name>
        <Quantity>
          {quantity} {measurement}
        </Quantity>
        <Price>{price}</Price>
      </Container>
    </Swipeable>
  );
}
