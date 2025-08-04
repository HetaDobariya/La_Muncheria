"use client";
import Loading from "@/components/Loading";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("The order status has been changed!");
    },
    onError() {
      toast.error("Failed to update order status!");
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
  };

  if (isLoading || status === "loading") return <Loading />;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3 text-blue-800">
          <thead>
            <tr className="text-left bg-blue-50">
              <th className="hidden md:block py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Price</th>
              <th className="hidden md:block py-3 px-2">Products</th>
              <th className="py-3 px-2">User Email</th>
              <th className="py-3 px-2">Payment</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: OrderType) => (
              <tr
                key={item.id}
                className={`${!item.intent_id
                  ? "bg-red-50"
                  : item.status !== "Delivered"
                    ? "bg-yellow-50"
                    : ""
                  } hover:bg-blue-100`}
              >
                <td className="hidden md:block py-4 px-2 text-sm">
                  {item.id.slice(0, 8)}...
                </td>
                <td className="py-4 px-2">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-4 px-2 font-medium">Rs.{item.price}</td>
                <td className="hidden md:block py-4 px-2">
                  {item.products?.[0]?.title || "No products"}
                  {item.products?.length > 1 && ` +${item.products.length - 1}`}
                </td>
                <td className="py-4 px-2 text-sm">
                  {item.userEmail || "No email"}
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.intent_id
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item.intent_id ? "Paid" : "Not Paid"}
                  </span>
                </td>
                {session?.user.isAdmin ? (
                  <td className="py-4 px-2">
                    <form
                      className="flex items-center justify-center gap-2"
                      onSubmit={(e) => handleUpdate(e, item.id)}
                    >
                      <select
                        defaultValue={item.status}
                        className="p-2 ring-1 ring-blue-200 rounded-md text-sm"
                        disabled={false}
                      >
                        {item.status === "Payment Pending" && (
                          <option value="Payment Pending">Processing Payment</option>
                        )}
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Being Prepared">Being Prepared</option>
                        <option value="On the Way">On the Way</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                        disabled={false}
                      >
                        <Image
                          src="/edit.png"
                          alt="Update"
                          width={16}
                          height={16}
                        />
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="py-4 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : item.status === "On the Way"
                          ? "bg-blue-100 text-blue-800"
                          : item.intent_id
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.intent_id
                        ? item.status === "Payment Pending"
                          ? "Processing Payment"
                          : item.status
                        : "Payment Pending"}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
//{item.createdAt.toString().slice(0, 10)}  date gives date +time so slice n use 1st 10 items date mnth yr
//form.elements[0] form has 2 ele input n edit button so 1st ele[0]