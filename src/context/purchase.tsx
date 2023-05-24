import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useQuery, useRealm } from "../libs/realm";
import { ProductInCart } from "../libs/realm/schema/ProductInCart";
import { useUser } from "@realm/react";

interface Purchase {
  marketName: string;
  typeList: string;
}

interface ProductIHaveAtHome {
  id: string;
  productName: string;
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
    productName: string,
    category: string,
    price: string,
    quantity: string,
    measurement: string
  ) => void;
  addToIHaveAtHomeList: (
    id: string,
    productName: string,
    category: string,
    quantity: string,
    measurement: string,
    status: string
  ) => void;
  cart: ProductInCart[];
  iHaveAtHomeList: ProductIHaveAtHome[];
  removeFromCart: (productId: string) => void;
  removeFromIHaveAtHomeList: (productId: string) => void;
  resetCart: () => void;
  resetIHaveAtHomeList: () => void;
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
    productName: string,
    category: string,
    price: string,
    quantity: string,
    measurement: string
  ) => {},
  addToIHaveAtHomeList: (
    id: string,
    productName: string,
    category: string,
    quantity: string,
    measurement: string,
    status: string
  ) => {},
  cart: [],
  iHaveAtHomeList: [],
  totalPrice: 0,
  removeFromCart: (productId: string) => {},
  removeFromIHaveAtHomeList: (productId: string) => {},
  resetCart: () => {},
  resetIHaveAtHomeList: () => {},
});

export const usePurchase = () => useContext(PurchaseContext);

function PurchaseProvider({ children }: PurchaseProviderProps) {
  const [purchase, setPurchase] = useState<Purchase>({} as Purchase);
  const [cart, setCart] = useState<ProductInCart[]>([]);
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
      for (const product of productsInCart) {
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

  function addToCart(
    productName: string,
    category: string,
    price: string,
    quantity: string,
    measurement: string
  ) {
    const isProductInCart = productsInCart.some(
      (item) => item.name === productName
    );

    if (isProductInCart) {
      Alert.alert("Aviso", "Produto já esta no carrinho!");
      return;
    }

    const newProduct: ProductInCart = {
      name: productName,
      category,
      price,
      quantity,
      measurement,
      _id: "",
      user_id: "",
      created_at: new Date(),
      updated_at: new Date(),
    };

    realm.write(() => {
      realm.create(
        "ProductInCart",
        ProductInCart.generate({
          category,
          measurement,
          name: productName,
          price,
          quantity,
          user_id: user!.id,
        })
      );
    });

    setCart([...cart, newProduct]);
  }

  function removeFromCart(product: ProductInCart) {
    realm.write(() => {
      realm.delete(product);
    });
  }
  function removeFromIHaveAtHomeList(productId: string) {
    const updatedCart = iHaveAtHomeList.filter((item) => item.id !== productId);

    setIHaveAtHomeList(updatedCart);
  }

  function addToIHaveAtHomeList(
    id: string,
    productName: string,
    category: string,
    quantity: string,
    measurement: string,
    status: string
  ) {
    const isProductInCart = iHaveAtHomeList.some(
      (item) => item.productName === productName
    );

    if (isProductInCart) {
      Alert.alert("Aviso", "Produto já esta no carrinho!");
      return;
    }
    const newProduct = {
      id,
      productName,
      category,
      quantity,
      measurement,
      status,
    };
    setIHaveAtHomeList([...iHaveAtHomeList, newProduct]);
  }

  const resetCart = () => {
    /*  setCart([]); */
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
  };

  return (
    <PurchaseContext.Provider value={contextValue}>
      {children}
    </PurchaseContext.Provider>
  );
}

export default PurchaseProvider;
