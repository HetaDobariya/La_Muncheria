import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

//like zustand first pass state then functions
export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      //state
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      //function
      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price,
                  // price: item.price + product.price,
                }
              : item //simply return that item widout changing any other items
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          }));
        }
      },
      // removeFromCart(item) {
      //   set((state) => ({
      //     products: state.products.filter((product) => product.id !== item.id),
      //     totalItems: state.totalItems - item.quantity,
      //     totalPrice: state.totalPrice - item.price * item.quantity,
      //   }));
      // },
      removeFromCart(item) {
  set((state) => {
    const productToRemove = state.products.find(p => p.id === item.id);

    if (!productToRemove) return state; // Item not found, no changes

    const updatedProducts = state.products.filter(p => p.id !== item.id);

    return {
      products: updatedProducts,
      totalItems: state.totalItems - productToRemove.quantity,
      totalPrice: state.totalPrice - (productToRemove.price * productToRemove.quantity),
    };
  });
},resetCart() {
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