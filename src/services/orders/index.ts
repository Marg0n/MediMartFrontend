"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;

export const createOrder = async (payload: any) => {
  try {
    const res = await fetch(`${API_BASE}/orders/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await res.json(); // includes GatewayPageURL
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllOrders = async (page: number, limit: number) => {
  try {
    const query = new URLSearchParams();
    query.append("page", page.toString());
    query.append("limit", limit.toString());

    const res = await fetch(`${API_BASE}/orders?${query.toString()}`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateOrder = async (id: string, payload: Partial<any>) => {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const confirmOrderSuccess = async (transactionId: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/success/${transactionId}`, {
      method: "POST",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const handleOrderFailure = async (transactionId: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/fail/${transactionId}`, {
      method: "POST",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
