import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Center,
  Container,
  Content,
  Label,
  List,
  Row,
  Text,
} from "./styles";
import { Product } from "../../components/Product";
import { Product as ProductSchema } from "../../libs/realm/schema/Product";
import { CategoryList } from "../../components/CategoryList";
import { SearchButton } from "../../components/SearchButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Loading } from "../../components/Loading";
import { usePurchase } from "../../context/purchase";
import { ListDashes } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { useQuery, useRealm } from "../../libs/realm";
import { TouchableOpacity } from "react-native";

type routeParamsProps = {
  category: string;
};

export function Purchase() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [listProducts, setListProducts] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const swipeableRef = useRef<any>(null);
  const { purchase } = usePurchase();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { COLORS } = useTheme();
  const products = useQuery(ProductSchema);
  const realm = useRealm();

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

  function handleAddtoList() {
    navigate("addtolist");
  }

  function handleChangeList() {
    navigate("startpurchase");
  }

  function getCategoryByApi() {
    if (category) {
      setIsLoading(true);
      const url = `http://192.168.1.110:3000/products?category=${category}`;
      axios
        .get(url)
        .then((response) => {
          const products = response.data.products;

          setIsLoading(false);
          setListProducts(products);
        })
        .catch((error) => {
          console.error("deu chabu", error);
          setIsLoading(false);
        });
    }
  }

  function getCategoryByRealm() {
    try {
      const productsFilterByCategory = products.filtered(
        `category = $0`,
        category
      );

      setListProducts(productsFilterByCategory);

      return products;
    } catch (error) {
      console.error("Error retrieving products:", error);
      return null;
    }
  }

  useEffect(() => {
    if (purchase.typeList === "suggestedList") {
      getCategoryByApi();
    } else {
      getCategoryByRealm();
    }
  }, [purchase, category]);

  function EmptyList() {
    return (
      <Center>
        <ListDashes size={64} color={COLORS.GRAY_400} />
        <Label>Sua lista esta vazia</Label>
        <Button title="Adicionar item a lista" onPress={handleAddtoList} />
      </Center>
    );
  }

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
              keyExtractor={(item: any) =>
                purchase.typeList === "myList" ? item._id : item.id
              }
              renderItem={({ item }: any) => (
                <Product
                  title={item.name}
                  onPress={() => handleAddToCart(item.name)}
                  goToIHaveAtHome={() => handleIHaveAtHome(item.name)}
                  swipeableRef={swipeableRef}
                />
              )}
              ListEmptyComponent={EmptyList}
            />
          )}
        </Box>
        <Row>
          <SearchButton
            isOpen={searchOpen}
            onPress={handleSearchOpen}
            onClose={() => setSearchOpen(false)}
          />

          <TouchableOpacity activeOpacity={0.7} onPress={handleChangeList}>
            <Text>Trocar lista</Text>
          </TouchableOpacity>
        </Row>
      </Content>
    </Container>
  );
}
