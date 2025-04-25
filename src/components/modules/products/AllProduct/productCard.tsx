"use client";
// components/ProductCard.tsx
import { Button } from "@/components/ui/button";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TMedicine } from "@/types";
import { ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ medicine }: { medicine: TMedicine }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (medicine: TMedicine) => {
    dispatch(addProduct(medicine));
  };

  return (
    <div className="">
      {/* Card Container */}
      <div className="border p-4 rounded-md shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg flex flex-col">
        <Link href={`/shop/${medicine?._id}`}>
          {/* Make image and name clickable via Link */}
          <div className="relative w-full h-90 overflow-hidden rounded-md group">
            <Image
              src={medicine?.Img as string}
              alt={medicine?.name}
              fill
              sizes="(max-width: 768px) 100vw,
       (max-width: 1200px) 50vw,
       33vw"
              className="object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h4 className="font-semibold text-sm mt-2">{medicine?.name}</h4>
          <p className="font-bold mt-2">${medicine?.price}</p>
        </Link>
        {/* Buttons */}
        <div className="flex items-center mt-auto pt-4 space-x-4">
          {/* <Link href={`/shop/${medicine?._id}`} passHref> */}
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-5 h-5" />
            Buy Now
          </Button>
          {/* </Link> */}
          <Button
            onClick={() => handleAddProduct(medicine)}
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
