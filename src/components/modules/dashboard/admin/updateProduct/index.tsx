/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateProduct } from "@/services/Product";
import { TMedicine } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateMedicineForm({
  medicine,
}: {
  medicine: TMedicine;
}) {
  const [formData, setFormData] = useState<TMedicine>(medicine);
  const [originalData, setOriginalData] = useState<TMedicine>(medicine);
  const [showNoChangesModal, setShowNoChangesModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    let updatedValue: string | number | boolean;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      updatedValue = e.target.checked;
    } else {
      updatedValue = type === "number" ? Number(value) : value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleUpdate = async () => {
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      setShowNoChangesModal(true);
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No auth token found.");
      return;
    }
    try {
      if (!medicine?._id) {
        toast.error("Product ID is missing");
        return;
      }
      await updateProduct(medicine._id, formData, token);
      toast.success("Product updated successfully");
      setOriginalData(formData);
    } catch (error: any) {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-center text-2xl font-bold mb-6 text-blue-700">
        Update Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Name */}
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Brand */}
          <label className="block mt-4 mb-1 font-medium">Brand</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Generic Name */}
          <label className="block mt-4 mb-1 font-medium">Generic Name</label>
          <input
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Dosage Category */}
          <label className="block mt-4 mb-1 font-medium">Dosage Category</label>
          <input
            name="dosCategory"
            value={formData.dosCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Strength */}
          <label className="block mt-4 mb-1 font-medium">Strength</label>
          <input
            name="strength"
            value={formData.strength}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          {/* Quantity */}
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Price */}
          <label className="block mt-4 mb-1 font-medium">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Expiry Date */}
          <label className="block mt-4 mb-1 font-medium">Expiry Date</label>
          <input
            name="expiryDate"
            type="date"
            value={
              typeof formData.expiryDate === "string"
                ? formData.expiryDate.slice(0, 10)
                : formData.expiryDate.toISOString().slice(0, 10)
            }
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* In Stock */}
          <label className="flex items-center mt-4 gap-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="font-medium">In Stock</span>
          </label>

          {/* Required Prescription */}
          <label className="block mt-4 mb-1 font-medium">
            Prescription Required
          </label>
          <select
            name="requiredPrescription"
            value={formData.requiredPrescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Image */}
      <label className="block mt-6 mb-1 font-medium">Image URL</label>
      <input
        name="Img"
        value={formData.Img}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Symptoms */}
      <label className="block mt-4 mb-1 font-medium">Symptoms</label>
      <input
        name="symptoms"
        value={formData.symptoms}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Manufacturer Details */}
      <label className="block mt-4 mb-1 font-medium">Manufacturer</label>
      <input
        name="manufacturerDetails"
        value={formData.manufacturerDetails}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Description */}
      <label className="block mt-4 mb-1 font-medium">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="w-full p-2 border rounded"
      />

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpdate}
          className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95"
        >
          🚀 Update Product
        </button>
      </div>

      {/* No Change Modal */}
      {showNoChangesModal && (
        <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white px-6 py-8 rounded-lg shadow-2xl text-center max-w-sm w-full animate-fade-slide-in">
            <div className="flex justify-center mb-4">
              {/* Info Icon */}
              <svg
                className="w-12 h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                />
              </svg>
            </div>
            <p className="text-gray-800 font-semibold text-lg mb-2">
              No changes detected!
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Please update at least one field before saving.
            </p>
            <button
              onClick={() => setShowNoChangesModal(false)}
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
