import React, { useState } from "react";
import { Box, Container, Header, Text, Title } from "./styles";
import { usePurchase } from "../../context/purchase";
import { CustomSelectPayment } from "../../components/CustomSelectPayment";
import { Button } from "../../components/Button";
import { useRealm } from "../../libs/realm";
import { Purchase } from "../../libs/realm/schema/Purchase";
import { useUser } from "@realm/react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Checkout() {
  const { navigate } = useNavigation();
  const {
    purchase,
    totalPrice,
    cart,
    amountProducts,
    resetCart,
    resetIHaveAtHomeList,
    resetPurchase,
  } = usePurchase();
  const [payment, setPayment] = useState("");
  const user = useUser();

  const realm = useRealm();

  function handleCheckout() {
    if (payment.length === 0) {
      Alert.alert(
        "Campo invalido",
        "selecione a forma de pagamento que utilizara no mercado."
      );
    }
    try {
      realm.write(() => {
        realm.create(
          "Purchase",
          Purchase.generate({
            marketName: purchase.marketName,
            paymentMethod: payment,
            cart: cart,
            purchaseValue: String(totalPrice),
            user_id: user!.id,
            amountProducts: String(amountProducts),
          })
        );
      });
      resetPurchase();
      resetCart();
      resetIHaveAtHomeList();
      navigate("home");
    } catch (error) {
      Alert.alert("Error", "Não foi possível registrar a sua compra.");
      console.error("Erro ao salvar a compra no Realm:", error);
    }
  }

  return (
    <Container>
      <CustomSelectPayment
        label="Forma de pagament"
        onValueChange={setPayment}
        value={payment}
      />
      <Box>
        <Header>
          <Title>{purchase.marketName}</Title>
          <Text>
            valor do carrinho:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(+totalPrice)}
          </Text>
        </Header>
        {payment && <Text>Pagamento: {payment}</Text>}
        <Text>Produtos no carrinho: {amountProducts}</Text>
      </Box>
      <Button title="Confirmar" onPress={handleCheckout} />
    </Container>
  );
}
