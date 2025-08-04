// "use client";

// import { ProductType } from "@/types/types";
// import { useCartStore } from "@/utils/store";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const Price = ({ product }: { product: ProductType }) => {
//   const [total, setTotal] = useState(Number(product.price));
//   const [quantity, setQuantity] = useState(1);
//   const [selected, setSelected] = useState(0); //first item index 0-small

//   const { addToCart } = useCartStore();

//   useEffect(()=>{
//     useCartStore.persist.rehydrate()
//   },[]) //for loading saved state from localStorage

//   useEffect(() => {
//     if (product.options?.length) {
//       setTotal(
//         Number(product.price) + product.options[selected].additionalPrice
//       );
//     }
//   }, [selected, product]);
//   //when quantity n selected gets changed we'll set total ,options is optional(it cn not exist) so if exists..

//   const handleCart = ()=>{
//     addToCart({
//       id: product.id,
//       title: product.title,
//       img: product.img,
//       price: total, // Store unit price (base price + option price)
//       ...(product.options?.length && {
//         optionTitle: product.options[selected].title,
//       }), //conditional spread if product has option add
//       quantity: quantity,
//     })
//     toast.success("Product added to the cart successfully!")
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <h2 className="text-2xl font-bold">Rs.{total}</h2>
//       {/* OPTIONS CONTAINER */}
//       <div className="flex gap-4">
//         {product.options?.length &&
//           product.options?.map((option, index) => (
//             <button
//               key={option.title}
//               className="min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md"
//               style={{
//                 background: selected === index ? "rgb(248 113 113)" : "white",
//                 color: selected === index ? "white" : "red",
//               }}
//               onClick={() => setSelected(index)}
//             >
//               {option.title}
//             </button>
//           ))}
//       </div>
//       {/* QUANTITY AND ADD BUTTON CONTAINER */}
//       <div className="flex justify-between items-center">
//         {/* QUANTITY  w-full use complete div section*/}
//         <div className="flex justify-between w-full p-3 ring-1 ring-blue-600">
//           <span>Quantity</span>
//           <div className="flex gap-4 items-center">
//             <button
//               onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
//             >
//               {"<"}
//             </button>
//             <span>{quantity}</span>
//             <button
//               onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
//             >
//               {">"}
//             </button>
//           </div>
//         </div>
//         {/* CART BUTTON */}
//         <button
//           className="uppercase w-56 bg-blue-600 text-white p-3 ring-1 ring-blue-600"
//           onClick={handleCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Price;



// //ic-items-center total.toFixed(2)-2 val after decimal

"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(Number(product.price)); // Removed division by 100
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        Number(product.price) + (product.options[selected].additionalPrice) // Removed division by 100
      );
    }
  }, [selected, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total, // Removed multiplication by 100
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    })
    toast.success("Product added to the cart successfully!")
  }


  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Rs.{total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY  w-full use complete div section*/}
        <div className="flex justify-between w-full p-3 ring-1 ring-blue-600">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-blue-600 text-white p-3 ring-1 ring-blue-600"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;