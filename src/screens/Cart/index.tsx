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

export function Cart() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { totalPrice, cart, removeFromCart, purchase } = usePurchase();
  const swipeableRef = useRef<any>(null);

  function handleSearchOpen() {
    setSearchOpen(!searchOpen);
  }

  useEffect(() => {
    if (searchProduct.length > 0) {
      const filtered = cart.filter((product: any) =>
        product.productName
          .toLowerCase()
          .includes(searchProduct.toLocaleLowerCase())
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
          <TotalPrice>{totalPrice}</TotalPrice>
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
                productName={item.productName}
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
        {!searchOpen && <Button title="Finalizar compras" />}
      </Content>
    </Container>
  );
}
