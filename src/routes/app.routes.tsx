import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { StartPurchase } from "../screens/StartPurchase";
import { Purchase } from "../screens/Purchase";
import { Cart } from "../screens/Cart";
import { MyList } from "../screens/MyList";
import { AddToList } from "../screens/AddToList";
import { AddToCart } from "../screens/AddToCart";
import { IHaveAtHome } from "../screens/IHaveAtHome";
import { HeaderPurchase } from "../components/HeaderPurchase";
import { Header } from "../components/Header";
import { HeaderHome } from "../components/HeaderHome";
import { PurchasingAnalysis } from "../screens/PurchasingAnalysis";
import { PurchaseDetails } from "../screens/PurchaseDetails";
import { SelectPurchaseForAnalysis } from "../screens/SelectPurchaseForAnalysis";
import { Checkout } from "../screens/Checkout";
import { Profile } from "../screens/Profile";

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="home"
        component={Home}
        options={{
          header: () => <HeaderHome />,
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          header: () => <Header title="Perfil" />,
        }}
      />
      <Screen
        name="startpurchase"
        component={StartPurchase}
        options={{
          header: () => <Header title="Iniciar compras" />,
        }}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{
          header: () => <Header title="Carrinho" />,
        }}
      />
      <Screen
        name="mylist"
        component={MyList}
        options={{
          header: () => <Header title="Minha lista" />,
        }}
      />
      <Screen
        name="addtolist"
        component={AddToList}
        options={{
          header: () => <Header title="Adicionar a lista" />,
        }}
      />
      <Screen
        name="addtocart"
        component={AddToCart}
        options={{
          header: () => <Header title="Adicionar" />,
        }}
      />
      <Screen
        name="ihaveathome"
        component={IHaveAtHome}
        options={{
          header: () => <Header title="Tenho em casa" />,
        }}
      />
      <Screen
        name="purchasedetails"
        component={PurchaseDetails}
        options={{
          header: () => <Header title="Detalhe da compra" />,
        }}
      />
      <Screen
        name="selectpurchases"
        component={SelectPurchaseForAnalysis}
        options={{
          header: () => <Header title="Selecione" />,
        }}
      />
      <Screen
        name="purchasingAnalysis"
        component={PurchasingAnalysis}
        options={{
          header: () => <Header title="Analise de compras" />,
        }}
      />
      <Screen
        name="checkout"
        component={Checkout}
        options={{
          header: () => <Header title="Finalizar compras" />,
        }}
      />
      <Group
        screenOptions={{
          header: () => <HeaderPurchase title="Compras" />,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      >
        <Screen
          name="Mercearia"
          component={Purchase}
          initialParams={{ category: "grocery" }}
        />
        <Screen name="Condimentos" component={Purchase} />
        <Screen name="Proteina" component={Purchase} />
        <Screen name="Lacticínios & Frios" component={Purchase} />
        <Screen name="Doces" component={Purchase} />
        <Screen name="Congelados" component={Purchase} />
        <Screen name="Hortifruti" component={Purchase} />
        <Screen name="Descartáveis" component={Purchase} />
        <Screen name="Higiene pessoal" component={Purchase} />
        <Screen name="Produtos de limpeza" component={Purchase} />
        <Screen name="Produtos de Bebê" component={Purchase} />
      </Group>
    </Navigator>
  );
}
