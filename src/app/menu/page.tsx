import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed!");

  }

  return res.json()
}

const getButtonText = (title: string) => {
  switch (title.toLowerCase()) {
    case "pasta":
      return "Explore the Classics →";
    case "wraps and sandwiches":
      return "Get Fancy →";
    case "extras":
      return "Customize Your Plate →";
    case "drinks":
      return "Quench Your Thirst →";
    default:
      return "Explore →";
  }
};

const MenuPage = async () => {

  const menu: MenuType = await getData()
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="relative w-full md:w-1/4 h-[400px] bg-cover bg-center rounded overflow-hidden group"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300"></div>

          <div className="relative z-10 text-white p-4 h-full flex flex-col justify-end">
            <h1 className="uppercase font-bold text-2xl">{category.title}</h1>
            <p className="text-sm mt-2 line-clamp-4">{category.desc}</p>
            <button className="mt-4 w-fit bg-white text-black py-1 px-3 rounded hover:bg-blue-600 hover:text-white transition">
              {getButtonText(category.title)}
            </button>
          </div>
        </Link>

      ))}
    </div>
  );
};

export default MenuPage;
//hidden 2xl:block hidden only visible is screen is 2xl bcuz anyway if we click on img you will be redirected
//menu