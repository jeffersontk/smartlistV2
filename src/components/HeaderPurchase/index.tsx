import { TouchableOpacity } from "react-native";
import { ArrowLeft, ShoppingCart } from "phosphor-react-native";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
};

export function HeaderPurchase({ title }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 32;
  const { navigate } = useNavigation();

  function handleHome() {
    navigate("home");
  }

  function handleCart() {
    navigate("cart");
  }

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleHome}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
      <Title>{title}</Title>
      <TouchableOpacity activeOpacity={0.7} onPress={handleCart}>
        <ShoppingCart size={32} color={COLORS.GRAY_300} />
      </TouchableOpacity>
    </Container>
  );
}
