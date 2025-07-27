import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed!");

  }

  return res.json()
}

type Props = {
  params: { category: string }
}

const CategoryPage = async ({ params }: Props) => {

  const products: ProductType[] = await getData(params.category)
  return (
    <div className="flex flex-wrap gap-4 text-blue-600 p-4">
      {products.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full sm:w-[48%] lg:w-[31%] h-[60vh] border border-blue-200 rounded-lg shadow-sm p-4 flex flex-col justify-between group odd:bg-blue-50 bg-white hover:shadow-md transition-all"
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">Rs.{item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-blue-600 text-white p-2 rounded-md">Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
//group-hover:block - when u hover on that group only then it is visible
//group-hover:hidden - hidden when hover on that group
//odd:bg-fuchsia-50 - if odd no. bg is fuchsia
//categories - pizza/pasta /product page
//products?cat=${category} - get all products that have this category