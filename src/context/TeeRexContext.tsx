import { createContext, useContext, useReducer } from "react";
import {
  productReducer,
  cartReducer,
  initialProductState,
  initialCartState,
} from "./reducers";

const ProductContext: React.Context<any> = createContext(initialProductState);
const CartContext: React.Context<any> = createContext(initialCartState);

interface IProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<IProviderProps> = ({ children }) => {
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductState
  );

  return (
    <ProductContext.Provider
      value={{
        productState,
        productDispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const CartProvider: React.FC<IProviderProps> = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  return (
    <CartContext.Provider
      value={{
        cartState,
        cartDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
export const useCart = () => useContext(CartContext);

export const Provider: React.FC<IProviderProps> = ({ children }) => {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  );
};
