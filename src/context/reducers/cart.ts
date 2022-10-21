export const initialCartState = {
  cart: [],
};

type State = {
  cart: Product[];
};

type Action = {
  type: string;
  payload?: any;
};

export const cartReducer = (
  state: State = initialCartState,
  { type, payload }: Action
) => {
  switch (type) {
    case "ADD_TO_CART":
    case "INCREASE_COUNT": {
      let record = state.cart?.find((item: Product) => item.id === payload.id);
      let updated_cart: Product[] = state.cart;

      if (record === undefined) {
        const update_payload = { ...payload, count: 1 };
        updated_cart = [...state.cart, update_payload];
      } else {
        updated_cart = state.cart.map((item: Product) => {
          return item.id === payload.id
            ? { ...item, count: (item?.count as number) + 1 }
            : item;
        });
      }

      return { ...state, cart: updated_cart };
    }

    case "DECREASE_COUNT": {
      let cart = state.cart.map((item: Product) => {
        return item.id === payload.id
          ? { ...item, count: (item?.count as number) - 1 }
          : item;
      });
      return { ...state, cart };
    }
      
    case "REMOVE_ITEM": {
      const remaining_cart = state.cart?.filter((item) => item.id !== payload);
      return { ...state, cart: [...remaining_cart] };
    }

    default:
      return state;
  }
};
