import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async ()=>{
  const res = await fetch("http://localhost:3000/api/products",{
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
  }

  return res.json()
}

const Featured = async () => {

  const featuredProducts:ProductType[] = await getData()

  return (
    <div className="w-screen overflow-x-scroll text-blue-600 mt-2 md:mt-12">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-blue-100 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER if img exists as its optional rotate 60deg*/}
            {item.img && (
             <div className="relative flex-1 w-full transition-all duration-500 hover:scale-105">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">Rs.{item.price}</span>
              {/* <button className="bg-blue-600 text-white p-2 rounded-md">
                Add to Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;

//md:w-[50vw] xl:w-[33vw]  md:2 items then 3 
//xl:h-[90vh] height