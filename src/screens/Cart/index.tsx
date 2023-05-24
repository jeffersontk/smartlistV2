import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Content,
  Row,
  Text,
  Title,
  TotalInCart,
  TotalPrice,
} from "./styles";
import { SearchButton } from "../../components/SearchButton";
import { Button } from "../../components/Button";
import { usePurchase } from "../../context/purchase";
import { FlatList } from "react-native";
import { ItemCart } from "../../components/ItemCart";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "../../libs/realm";
import { ProductInCart } from "../../libs/realm/schema/ProductInCart";

export function Cart() {
  const { navigate } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductInCart[]>([]);
  const { totalPrice, removeFromCart, purchase } = usePurchase();
  const swipeableRef = useRef<any>(null);

  const cart = useQuery(ProductInCart);

  function handleSearchOpen() {
    setSearchOpen(!searchOpen);
  }

  function handleToCheckout() {
    navigate("checkout");
  }

  useEffect(() => {
    if (searchProduct.length > 0) {
      const filtered = cart.filter((product: any) =>
        product.name.toLowerCase().includes(searchProduct.toLocaleLowerCase())
      );

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(cart);
    }
  }, [searchProduct, cart]);

  const productList =
    searchProduct && searchProduct.length > 0 ? filteredProducts : cart || [];

  return (
    <Container>
      <Content>
        <TotalInCart>
          <Title>Total no carrinho</Title>
          <TotalPrice>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalPrice)}
          </TotalPrice>
        </TotalInCart>

        <Box>
          <Text>Mercado {purchase.marketName}</Text>
          <FlatList
            data={productList}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ItemCart
                measurement={item.measurement}
                price={item.price}
                productName={item.name}
                quantity={item.quantity}
                swipeableRef={swipeableRef}
                onRemove={() => removeFromCart(item.id)}
              />
            )}
          />
          <SearchButton
            isOpen={searchOpen}
            onPress={handleSearchOpen}
            onClose={() => setSearchOpen(false)}
            value={searchProduct}
            onChangeValue={setSearchProduct}
          />
        </Box>
        {!searchOpen && (
          <Button title="Finalizar compras" onPress={handleToCheckout} />
        )}
      </Content>
    </Container>
  );
}
