import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useQuery, useRealm } from "../libs/realm";
import { ProductInCart } from "../libs/realm/schema/ProductInCart";
import { useUser } from "@realm/react";

interface Purchase {
  marketName: string;
  typeList: string;
}

export interface CartProps {
  _id: Realm.BSON.UUID;
  name: string;
  category: string;
  price: string;
  quantity: string;
  measurement: string;
  user_id: string;
}

interface ProductIHaveAtHome {
  id: string;
  name: string;
  category: string;
  quantity: string;
  measurement: string;
  status: string;
}

interface PurchaseContextType {
  purchase: Purchase;
  totalPrice: number;
  startPurchase: (marketName: string, typeList: string) => void;
  addToCart: (
    id: Realm.BSON.UUID,
    name: string,
    category: string,
    price: string,
    quantity: string,
    measurement: string
  ) => void;
  addToIHaveAtHomeList: (
    id: string,
    name: string,
    category: string,
    quantity: string,
    measurement: string,
    status: string
  ) => void;
  cart: CartProps[];
  iHaveAtHomeList: ProductIHaveAtHome[];
  removeFromCart: (product: CartProps) => void;
  removeFromIHaveAtHomeList: (productId: string) => void;
  resetCart: () => void;
  resetIHaveAtHomeList: () => void;
  resetPurchase: () => void;
}

interface PurchaseProviderProps {
  children: React.ReactNode;
}

const PurchaseContext = createContext<PurchaseContextType>({
  startPurchase: () => {},
  purchase: {
    marketName: "",
    typeList: "myList",
  },
  addToCart: (
    id: Realm.BSON.UUID,
    name: string,
    category: string,
    price: string,
    quantity: string,
    measurement: string
  ) => {},
  addToIHaveAtHomeList: (
    id: string,
    name: string,
    category: string,
    quantity: string,
    measurement: string,
    status: string
  ) => {},
  cart: [],
  iHaveAtHomeList: [],
  totalPrice: 0,
  removeFromCart: (product: CartProps) => {},
  removeFromIHaveAtHomeList: (productId: string) => {},
  resetCart: () => {},
  resetIHaveAtHomeList: () => {},
  resetPurchase: () => {},
});

export const usePurchase = () => useContext(PurchaseContext);

function PurchaseProvider({ children }: PurchaseProviderProps) {
  const [purchase, setPurchase] = useState<Purchase>({} as Purchase);
  const [cart, setCart] = useState<CartProps[]>([]);
  const [iHaveAtHomeList, setIHaveAtHomeList] = useState<ProductIHaveAtHome[]>(
    []
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const realm = useRealm();
  const productsInCart = useQuery(ProductInCart);
  const user = useUser();

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (const product of cart) {
        total += parseFloat(product.price) * parseInt(product.quantity);
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  function startPurchase(marketName: string, typeList: string) {
    setPurchase({
      marketName,
      typeList,
    });
  }

  function resetPurchase() {
    setPurchase({} as Purchase);
  }

  function addToCart(
    id: Realm.BSON.UUID,
    name: string,
    category: string,
    price: string,
    quantity: string,
    measurement: string
  ) {
    const isProductInCart = cart.some((item) => item.name === name);

    if (isProductInCart) {
      Alert.alert("Aviso", "Produto já esta no carrinho!");
      return;
    }
    const newProduct = {
      _id: id,
      name,
      category,
      price,
      quantity,
      measurement,
      user_id: user!.id,
    };

    setCart([...cart, newProduct]);
    /* realm.write(() => {
      realm.create(
        "ProductInCart",
        ProductInCart.generate({
          category,
          measurement,
          name,
          price,
          quantity,
          user_id: user!.id,
        })
      );
    }); */
  }

  function removeFromCart(product: CartProps) {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    /*   realm.write(() => {
      realm.delete(product);
    }); */
  }
  function removeFromIHaveAtHomeList(productId: string) {
    const updatedCart = iHaveAtHomeList.filter((item) => item.id !== productId);

    setIHaveAtHomeList(updatedCart);
  }

  function addToIHaveAtHomeList(
    id: string,
    name: string,
    category: string,
    quantity: string,
    measurement: string,
    status: string
  ) {
    const isProductInCart = iHaveAtHomeList.some((item) => item.name === name);

    if (isProductInCart) {
      Alert.alert("Aviso", "Produto já esta no carrinho!");
      return;
    }
    const newProduct = {
      id,
      name,
      category,
      quantity,
      measurement,
      status,
    };

    setIHaveAtHomeList([...iHaveAtHomeList, newProduct]);
  }

  const resetCart = () => {
    setCart([]);
  };

  const resetIHaveAtHomeList = () => {
    setIHaveAtHomeList([]);
  };

  const contextValue = {
    purchase,
    cart,
    totalPrice,
    iHaveAtHomeList,
    startPurchase,
    addToCart,
    removeFromCart,
    addToIHaveAtHomeList,
    resetCart,
    resetIHaveAtHomeList,
    removeFromIHaveAtHomeList,
    resetPurchase,
  };

  return (
    <PurchaseContext.Provider value={contextValue}>
      {children}
    </PurchaseContext.Provider>
  );
}

export default PurchaseProvider;
