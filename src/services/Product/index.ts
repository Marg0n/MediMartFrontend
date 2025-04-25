/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all products with filters
export const getAllProducts = async (
  page: string,
  limit: string,
  filters: Record<string, any>
) => {
  try {
    // Initialize query parameters
    const queryParams = new URLSearchParams();

    // Append filters to the query parameters
    if (filters.searchTerm)
      queryParams.append("searchTerm", filters.searchTerm);
    if (filters.category) queryParams.append("dosCategory", filters.category);
    if (filters.symptoms) queryParams.append("symptoms", filters.symptoms);

    queryParams.append("limit", limit);
    queryParams.append("page", page);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines?${queryParams.toString()}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines/${productId}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// create a new product
export const createProduct = async (productData: Record<string, any>) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// update a product
export const updateProduct = async (
  productId: string,
  updatedData: Record<string, any>,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// ✅ Updated deleteProduct function
export const deleteProduct = async (productId: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("DELETE response:", data);
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
