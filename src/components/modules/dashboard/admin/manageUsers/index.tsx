/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getAllOrders } from "@/services/orders";
import { getAllUsers } from "@/services/users";
import { IUser } from "@/types";
import { IOrderDB } from "@/types/order";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [orders, setOrdders] = useState<IOrderDB[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  // const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const limit = 10;
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No auth token found.");
        return;
      }
      try {
        const data = await getAllUsers(token);

        setUsers(data?.data || []);
        // const totalItems = data?.data?.meta?.total || 0;
        // setTotalPages(Math.ceil(totalItems / limit));
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        const orders = data?.data?.data || [];
        // Filter orders for the specific user
        setOrdders(orders);
        // orders.filter((order: IOrderDB) => order?.user?._id === user._id)
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          👥 Manage Users
        </h2>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-indigo-600">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Role",
                  "Running Orders",
                  "Previous Orders",
                  "Update",
                  "Delete",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td
                    className={`px-3 py-1 text-shadow-xs font-bold rounded-6xl text-center ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                        : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {/* {user.runningOrders.length} */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {/* {user.previousOrders.length} */}
                  </td>
                  <td className=" text-center">
                    <Link href={`/admin/users/${user._id}`}>
                      <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition">
                        📝 Details
                      </button>
                    </Link>
                  </td>
                  <td className=" text-center">
                    <button className="inline-flex items-center justify-center p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
