/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { getAllProducts } from "@/services/Product";
import { TMedicine } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FilterSearch = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMedicines, setAllMedicines] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await getAllProducts("1", "100", {}); // Fetch all products
      setAllMedicines(res?.data?.result || []);

      const categoriesList = [
        ...new Set(
          res?.data?.result.map((item: TMedicine) => item.dosCategory)
        ),
      ];
      const symptomsList = [
        ...new Set(res?.data?.result.map((item: TMedicine) => item.symptoms)),
      ];

      setCategories(categoriesList as string[]);
      setSymptoms(symptomsList as string[]);
    };

    fetchMedicines();
  }, []);

  const handleApply = () => {
    onFilterChange({
      searchTerm,
      category: selectedCategories.join(","),
      symptoms: selectedSymptoms.join(","),
    });
    toast.success("Filters applied successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedSymptoms([]);
    onFilterChange({
      searchTerm: "",
      category: "",
      symptoms: "",
    });
    toast.success("Filters reset successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCategorySelect = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? [] : [value]));
  };

  const handleSymptomSelect = (value: string) => {
    setSelectedSymptoms((prev) => (prev.includes(value) ? [] : [value]));
  };

  return (
    <div className=" p-6 space-y-6 border rounded-lg shadow-lg bg-white  shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg  border-gray-200">
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter */}
      <div>
        <label className="block text-lg font-semibold mb-2">
          🧪 Categories
        </label>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategorySelect(category)}
                className="checkbox checkbox-sm"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Symptoms Filter */}
      <div>
        <label className="block text-lg font-semibold mb-2">💊 Symptoms</label>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {symptoms.map((symptom) => (
            <label key={symptom} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleSymptomSelect(symptom)}
                className="checkbox checkbox-sm"
              />
              <span>{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button className="btn btn-primary" onClick={handleApply}>
          ✅ Apply
        </button>
        <button className="btn btn-outline" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSearch;
