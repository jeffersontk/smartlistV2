import React, { useState, useEffect } from "react";
import { Container, Content, Footer } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { ItemList } from "../../components/ItemList";
import { FlatList } from "react-native";
import { Category } from "../../utils/enumCategory";
import { Product } from "../../libs/realm/schema/Product";
import { useQuery, useRealm } from "../../libs/realm";
import { SearchButton } from "../../components/SearchButton";

export function MyList() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const { navigate } = useNavigation();
  const realm = useRealm();
  const products = useQuery(Product);

  function handleSearchOpen() {
    setSearchOpen(!searchOpen);
  }

  function handleDelete(item: Product) {
    realm.write(() => {
      realm.delete(item);
    });
  }

  function handleAddToList() {
    navigate("addtolist");
  }

  useEffect(() => {
    if (searchProduct.length > 0) {
      const filtered = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchProduct.toLocaleLowerCase())
      );

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchProduct, products]);
  const productList =
    searchProduct && searchProduct.length > 0
      ? filteredProducts
      : products || [];

  return (
    <Container>
      <Content>
        <FlatList
          data={productList}
          keyExtractor={(item) => String(item!._id)}
          renderItem={({ item }) => (
            <ItemList
              handleDelete={() => handleDelete(item)}
              title={item.name}
              subtitle={item.category as keyof typeof Category}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <Footer>
          <SearchButton
            isOpen={searchOpen}
            onPress={handleSearchOpen}
            onClose={() => setSearchOpen(false)}
            value={searchProduct}
            onChangeValue={setSearchProduct}
          />
          {!searchOpen && <ButtonIcon icon={Plus} onPress={handleAddToList} />}
        </Footer>
      </Content>
    </Container>
  );
}
