"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Offer = () => {
  const router = useRouter();

  return (
    <div className="bg-blue-50 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 rounded-lg shadow-sm overflow-hidden">

      {/* TEXT CONTAINER */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Weekend Dosa Deal</h1>
        <p className="text-gray-700 text-lg max-w-md">
          Spice up your weekend with our crowd-favorite <strong>Mysore Masala</strong> or go bold with the <strong>Jini Roll</strong>.
          Enjoy special discounts — this weekend only!
        </p>
        <button
          onClick={() => router.push("/menu/plain-dhosa")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-6 rounded-md shadow"
        >
          Order Now
        </button>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="relative w-full md:w-1/2 h-64 md:h-[350px] mt-10 md:mt-0 rounded-lg overflow-hidden">
        <Image
          src="/offer.jpg"
          alt="Dosa Offer"
          fill
          className="object-contain object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/70 via-transparent to-transparent" />
      </div>

    </div>
  );
};

export default Offer;


//md:bg-[url('/offerBg.png')] md:h-[70vh] - for bg image