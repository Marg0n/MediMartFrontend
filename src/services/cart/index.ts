/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IPartialOrder } from "@/types/cart";
import { cookies } from "next/headers";

export const createOrder = async (order: IPartialOrder) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};