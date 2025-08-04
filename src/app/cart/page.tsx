"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { products, removeFromCart, resetCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setTimeout(() => setHydrated(true), 0);
  }, []);

  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Payment Pending",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!hydrated) return null;

  const groupedItems = Object.values(
    products.reduce((acc, item) => {
      const key = `${item.id}_${item.optionTitle || ""}`;
      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].quantity += item.quantity;
        acc[key].price += item.price;
      }
      return acc;
    }, {} as Record<string, typeof products[0]>)
  );

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-blue-600 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {groupedItems.length > 0 ? (
          groupedItems.map((item) => (
            <div
              className="flex items-center justify-between mb-4"
              key={`${item.id}_${item.optionTitle}`}
            >
              {item.img && (
                <Image src={item.img} alt="" width={100} height={100} />
              )}
              <div>
                <h1 className="uppercase text-xl font-bold">
                  {item.title} x{item.quantity}
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">Rs.{item.price * item.quantity}</h2>
              <span
                className="cursor-pointer"
                onClick={() => removeFromCart(item)}
              >
                X
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>Rs.{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>Rs.0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL(INCL. TAX)</span>
          <span className="font-bold">Rs.{totalPrice}</span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;