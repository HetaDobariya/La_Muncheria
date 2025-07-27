"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCartStore } from "@/utils/store";

  const handleLogout = () => {
    useCartStore.getState().resetCart(); // Clear the cart
    signOut(); //Then logout
  };

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={(handleLogout)}>Logout</span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
