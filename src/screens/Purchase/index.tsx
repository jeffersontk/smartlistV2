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
import { Alert, TouchableOpacity } from "react-native";

type routeParamsProps = {
  category: string;
};

export function Purchase() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [listProducts, setListProducts] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const {
    purchase,
    cart,
    iHaveAtHomeList,
    resetCart,
    resetIHaveAtHomeList,
    removeFromIHaveAtHomeList,
  } = usePurchase();

  const { navigate } = useNavigation();
  const route = useRoute();
  const { COLORS } = useTheme();
  const products = useQuery(ProductSchema);

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

  function handleIHaveAtHome(productName: string, id: string) {
    navigate("ihaveathome", {
      id,
      category,
      productName,
    });
  }

  function handleAddtoList() {
    navigate("addtolist");
  }

  function handleChangeList() {
    Alert.alert(
      "Deseja trocar de lista?",
      "Ao fazer isso, o carrinho será limpo.",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            resetCart();
            resetIHaveAtHomeList();
            navigate("startpurchase");
          },
        },
      ]
    );
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

  function handleRemoveIHaveAtHome(id: string) {
    const update = listProducts.map((item: any) => {
      if (purchase.typeList === "myList" ? String(item._id) : item.id === id) {
        const updatedItem = JSON.parse(JSON.stringify(item));
        updatedItem.quantity = "";
        updatedItem.measurement = "";
        updatedItem.status = "";

        return updatedItem;
      } else {
        return item;
      }
    });
    setListProducts(update);
    removeFromIHaveAtHomeList(id);
  }

  useEffect(() => {
    if (purchase.typeList === "suggestedList") {
      getCategoryByApi();
    } else {
      getCategoryByRealm();
    }
  }, [purchase, category]);

  useEffect(() => {
    if (listProducts) {
      const updateList = listProducts.map((product: any, index: number) => {
        const isProductInCart = cart.some(
          (item) => item.productName === product.name
        );
        const isProductIHaveAtHome = iHaveAtHomeList.some(
          (item) => item.productName === product.name
        );

        const filt = iHaveAtHomeList.filter(
          (item) => item.productName === product.name
        );
        if (index >= 0 && index < filt.length) {
          product.isCheck = isProductInCart;
          product.isCheckAtHome = isProductIHaveAtHome;
          product.quantity = filt[index].quantity ?? 0;
          product.measurement = filt[index].measurement ?? "";
          product.status = filt[index].status ?? "";

          return product;
        } else {
          product.isCheck = isProductInCart;
          product.isCheckAtHome = isProductIHaveAtHome;

          return product;
        }
      });

      setListProducts(updateList);
    }
  }, [cart, iHaveAtHomeList]);

  useEffect(() => {
    if (searchProduct.length > 0) {
      const filtered = listProducts.filter((product: any) =>
        product.name.toLowerCase().includes(searchProduct.toLocaleLowerCase())
      );

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(listProducts);
    }
  }, [searchProduct, listProducts]);

  const productList =
    searchProduct && searchProduct.length > 0
      ? filteredProducts
      : listProducts || [];

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
              data={productList}
              keyExtractor={(item: any) =>
                purchase.typeList === "myList" ? String(item._id) : item.id
              }
              renderItem={({ item }: any) => {
                return (
                  <Product
                    title={item.name}
                    onPress={() => handleAddToCart(item.name)}
                    isCheck={item.isCheck}
                    isCheckAtHome={item.isCheckAtHome}
                    quantityAtHome={item.quantity}
                    measurement={item.measurement}
                    status={item.status}
                    goToIHaveAtHome={() => {
                      handleIHaveAtHome(
                        item.name,
                        purchase.typeList === "myList"
                          ? String(item._id)
                          : item.id
                      );
                    }}
                    onRemoveToIHaveAtHome={() => {
                      handleRemoveIHaveAtHome(
                        purchase.typeList === "myList"
                          ? String(item._id)
                          : item.id
                      );
                    }}
                  />
                );
              }}
              ListEmptyComponent={EmptyList}
            />
          )}
        </Box>
        <Row>
          <SearchButton
            isOpen={searchOpen}
            onPress={handleSearchOpen}
            onClose={() => setSearchOpen(false)}
            value={searchProduct}
            onChangeValue={setSearchProduct}
          />
          {!searchOpen && (
            <TouchableOpacity activeOpacity={0.7} onPress={handleChangeList}>
              <Text>Trocar lista</Text>
            </TouchableOpacity>
          )}
        </Row>
      </Content>
    </Container>
  );
}
