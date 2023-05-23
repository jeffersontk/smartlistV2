import React, { useRef, useEffect } from "react";
import { FlatList } from "react-native";
import { Container, Item, Label } from "./styles";
import { categories } from "../../data/categories";
import { useNavigation, useRoute } from "@react-navigation/native";

export function CategoryList() {
  const { navigate } = useNavigation();
  const currentRoute = useRoute();
  const flatListRef = useRef<FlatList>(null);

  function handleNavigateCategory(route: any) {
    navigate(route.name, { category: route.category });
  }

  useEffect(() => {
    const activeIndex = categories.findIndex(
      (category) => category.name === currentRoute.name
    );
    if (flatListRef.current && activeIndex !== -1) {
      flatListRef.current.scrollToIndex({
        index: activeIndex,
        animated: true,
        viewOffset: 0,
        viewPosition: 0.5,
      });
    }
  }, [currentRoute]);

  const getItemLayout = (data: any, index: any) => ({
    length: 0,
    offset: 100 * index,
    index,
  });

  return (
    <Container
      ref={flatListRef}
      data={categories}
      keyExtractor={(item: any) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      getItemLayout={getItemLayout}
      renderItem={({ item }: any) => {
        return (
          <Item
            activeOpacity={0.7}
            active={item.name === currentRoute.name}
            onPress={() => handleNavigateCategory(item)}
          >
            <Label active={item.name === currentRoute.name}>{item.name}</Label>
          </Item>
        );
      }}
    />
  );
}
