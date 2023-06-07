import React, { useState, useEffect } from "react";
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
import { useQuery } from "../../libs/realm";
import { Alert, TouchableOpacity } from "react-native";
import { Realm } from "@realm/react";

type routeParamsProps = {
  category: string;
};

export function Purchase() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [listProducts, setListProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const {
    purchase,
    cart,
    iHaveAtHomeList,
    resetCart,
    resetIHaveAtHomeList,
    resetPurchase,
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

  function handleAddToCart(productName: string, id: Realm.BSON.UUID) {
    navigate("addtocart", {
      category,
      productName,
      id,
    });
  }

  function handleIHaveAtHome(productName: string, id: Realm.BSON.UUID) {
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
      "Deseja Cancelar as compras?",
      "Ao fazer isso, o carrinho será limpo.",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            resetCart();
            resetIHaveAtHomeList();
            resetPurchase();
            navigate("home");
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
          setListProducts([]);
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
      if (cart.length > 0) {
        CheckIsProductInCart(productsFilterByCategory);
      }
    } catch (error) {
      console.error("Error retrieving products:", error);
      return null;
    }
  }

  function CheckIsProductInCart(list: any) {
    if (cart.length > 0) {
      const updateList = list.map((product: any) => {
        const isProductInCart = cart.some((item) => item.name === product.name);
        product.isCheck = isProductInCart;
        return product;
      });

      setListProducts(updateList);
    }
  }

  function CheckIsProductAtHome(list: any) {
    if (iHaveAtHomeList.length > 0) {
      const updateList = list.map((product: any) => {
        const matchedItem = iHaveAtHomeList.find(
          (item) => item.name === product.name
        );
        if (matchedItem?.isAtHome) {
          product.isCheckAtHome = matchedItem.isAtHome;
          product.quantity = matchedItem.quantity ?? 0;
          product.measurement = matchedItem.measurement ?? "";
          product.status = matchedItem.status ?? "";
        }
        return product;
      });

      setListProducts(updateList);
    } else {
      const updateList = list.map((product: any) => {
        product.isCheckAtHome = false;
        product.quantity = "";
        product.measurement = "";
        product.status = "";
        return product;
      });
      setListProducts(updateList);
    }
  }

  function handleRemoveIHaveAtHome(id: string) {
    removeFromIHaveAtHomeList(id);
  }

  useEffect(() => {
    getCategoryByRealm();
  }, [category]);

  useEffect(() => {
    if (listProducts.length > 0) {
      CheckIsProductInCart(listProducts);
    }
  }, [cart]);

  useEffect(() => {
    if (listProducts.length > 0) {
      CheckIsProductAtHome(listProducts);
    }
  }, [iHaveAtHomeList]);

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
                purchase.typeList === "myList" ? item._id : item.id
              }
              renderItem={({ item }: any) => {
                return (
                  <Product
                    title={item.name}
                    onPress={() => handleAddToCart(item.name, item._id)}
                    isCheck={item.isCheck}
                    isCheckAtHome={item.isCheckAtHome}
                    quantityAtHome={item.quantity}
                    measurement={item.measurement}
                    status={item.status}
                    goToIHaveAtHome={() => {
                      handleIHaveAtHome(item.name, item._id);
                    }}
                    onRemoveToIHaveAtHome={() => {
                      handleRemoveIHaveAtHome(item.name);
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
              <Text>Cancelar</Text>
            </TouchableOpacity>
          )}
        </Row>
      </Content>
    </Container>
  );
}
