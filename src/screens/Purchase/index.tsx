import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Content, List } from "./styles";
import { HeaderPurchase } from "../../components/HeaderPurchase";
import { Product } from "../../components/Product";
import { CategoryList } from "../../components/CategoryList";
import { SearchButton } from "../../components/SearchButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { FlatList } from "react-native";
import { Loading } from "../../components/Loading";

type routeParamsProps = {
  category: string;
};

export function Purchase() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [listProducts, setListProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const swipeableRef = useRef<any>(null);

  const { navigate } = useNavigation();
  const route = useRoute();
  const { category } = route.params as routeParamsProps;

  function handleSearchOpen() {
    setSearchOpen(!searchOpen);
  }

  function handleAddToCart(productName: string) {
    navigate("addtocart", {
      category,
      productName,
    });
  }

  function handleIHaveAtHome(productName: string) {
    navigate("ihaveathome", {
      category,
      productName,
    });
  }

  function getCategory() {
    if (category) {
      setIsLoading(true);
      const url = `http://192.168.1.110:3000/products?category=${category}`;
      axios
        .get(url)
        .then((response) => {
          const products = response.data.products;
          const newProducts = products.filter((p: any) => {
            return listProducts.findIndex((lp) => lp.id === p.id) === -1;
          });
          setIsLoading(false);
          setListProducts([...listProducts, ...newProducts]);
        })
        .catch((error) => {
          console.error("deu chabu", error);
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container>
      <Content>
        <CategoryList />
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <List
              data={listProducts}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <Product
                  title={item.name}
                  onPress={() => handleAddToCart(item.name)}
                  goToIHaveAtHome={() => handleIHaveAtHome(item.name)}
                  swipeableRef={swipeableRef}
                />
              )}
            />
          )}
        </Box>
        <SearchButton
          isOpen={searchOpen}
          onPress={handleSearchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </Content>
    </Container>
  );
}
