export type ProductNavigationProps = {
  id: string;
};

export type OrderNavigationProps = {
  id: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      product: ProductNavigationProps | undefined;
      order: OrderNavigationProps;
      orders: undefined;
    }
  }
}
