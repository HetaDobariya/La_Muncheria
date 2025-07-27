import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import AboutPage from "@/app/about/page";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-blue-600 p-4 flex items-center justify-between border-b-2 border-b-blue-600 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About</Link>
      </div>
      {/* LOGO */}
      <div className="flex-1 flex justify-center items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Only Dhosa"
            width={200}   // Adjust as needed
            height={60}   // Adjust as needed
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
      </div>
      {/* MOBILE MENU - if md device hide the hamburger*/}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer px-1 rounded-md mr-4">
          <Image src="/phone.png" alt="" width={20} height={20} />
         <span className="whitespace-nowrap">98253 57226</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;

//md:absolute top-3 r-2 for md screen move call to top lg-large xl-even bigger than lg
