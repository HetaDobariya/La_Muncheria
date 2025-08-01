import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";


// FETCH ALL CATEGORIES
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

//not a page but an api route so next says to name it route.ts/route.js
//JSON.stringify({ message: "Something went wrong!" }) - object not just a msg