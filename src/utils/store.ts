import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.id === item.id &&
            product.optionTitle === item.optionTitle
        );

        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === item.id &&
            product.optionTitle === item.optionTitle
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + item.price,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      removeFromCart(item) {
        set((state) => {
          const productToRemove = state.products.find(
            (p) =>
              p.id === item.id &&
              p.optionTitle === item.optionTitle
          );
          if (!productToRemove) return state;
          const updatedProducts = state.products.filter(
            (p) =>
              !(p.id === item.id && p.optionTitle === item.optionTitle)
          );
          return {
            products: updatedProducts,
            totalItems: state.totalItems - productToRemove.quantity,
            totalPrice: state.totalPrice - productToRemove.price,
          };
        });
      },

      resetCart() {
        set(INITIAL_STATE);
      },
    }),
    { name: "cart", skipHydration: true }
  )
);

// set((state) => ({ take inital state
//          products: [...state.products, item], take prev products and the added item
//products: state.products.filter((product) => product.id !== item.id) -> product wth id not equal to item.id will remain.
// thus the item with the matching ID is removed from the cart.
//use persist middleware so state remains after refresh { name: "cart", skipHydration: true }-store inot local storage and name is cart
//by default next uses server side component so after refresh it is trying to change this component from client to server so thats causing err so use skiphydration to prevent err