"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCartStore } from "@/utils/store";
import { useRouter } from "next/navigation";

const UserLinks = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      useCartStore.getState().resetCart(); // Clear the cart
      await signOut({ 
        callbackUrl: "/login", // Redirect to login page after sign-out
        redirect: false // We'll handle the redirect manually
      });
      router.push("/"); 
      router.refresh(); // Refresh the page to clear any cached state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;