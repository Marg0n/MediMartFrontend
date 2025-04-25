/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import FilterSearch from "./AllProduct/filterSearch";
import InfiniteProductList from "./AllProduct/inifinityScroll";

const AllProducts = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    symptoms: "",
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="m-10">
      <h1 className="text-3xl font-semibold text-center m-8">Medicines</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left 80%: Product List */}
        <div className="lg:col-span-4">
          <InfiniteProductList filters={filters} />
        </div>

        {/* Right 20%: Filter Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-2">
            <FilterSearch onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
