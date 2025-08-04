"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import {useRouter} from "next/navigation";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/churros.jpg",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in Surat",
    image: "/veg_wrap.jpg",
  },
  {
    id: 3,
    title: "the best pasta to share with your family",
    image: "/white_penne.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        // if length 2 back to 0 or prev+1
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const router = useRouter()
  const handleOrderNow = () => {
    router.push("/menu"); // ← navigate to /menu
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-blue-600 font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button onClick={handleOrderNow} className="bg-blue-600 text-white py-4 px-8">Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
//usestate use client
//flex-row in singl row and flex-col everything in single col
//flex-1 if horizotal height full width 50 50 ,if vertical height 50 and width full-100%