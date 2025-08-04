import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-blue-600 flex items-center justify-between bg-white border-t">
      <Link href="/" className="font-bold text-xl">LA MUNCHERIA</Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;