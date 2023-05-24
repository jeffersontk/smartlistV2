export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      startpurchase: undefined;
      Mercearia: { category: string };
      Condimentos: { category: string };
      Proteina: { category: string };
      "Lacticínios & Frios": { category: string };
      Doces: { category: string };
      Congelados: { category: string };
      Hortifruti: { category: string };
      Descartáveis: { category: string };
      "Higiene pessoal": { category: string };
      "Produtos de limpeza": { category: string };
      "Produtos de Bebê": { category: string };
      cart: undefined;
      mylist: undefined;
      addtolist: undefined;
      addtocart: {
        productName: string;
        category: string;
      };
      ihaveathome: {
        id: string;
        productName: string;
        category: string;
      };
      purchasedetails: {
        id: string;
        marketName: string;
        purchaseDay: string;
        purchaseValue: string;
        quantityItems: string;
        paymentMethod: string;
      };
      selectpurchases: undefined;
      purchasingAnalysis: undefined;
    }
  }
}
