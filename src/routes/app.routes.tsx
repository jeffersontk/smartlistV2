import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Departure } from "../screens/Departure";
import { Arrival } from "../screens/Arrival";
import { StartPurchase } from "../screens/StartPurchase";
import { Purchase } from "../screens/Purchase";
import { Cart } from "../screens/Cart";
import { MyList } from "../screens/MyList";
import { AddToList } from "../screens/AddToList";

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "push",
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="startpurchase" component={StartPurchase} />
      <Group>
        <Screen name="Mercearia" component={Purchase} />
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
      <Screen name="cart" component={Cart} />
      <Screen name="mylist" component={MyList} />
      <Screen name="addtolist" component={AddToList} />
    </Navigator>
  );
}
