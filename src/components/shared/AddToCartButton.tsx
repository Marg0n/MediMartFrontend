'use client';

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import { TMedicine } from "@/types";
import { addProduct } from "@/redux/features/cartSlice";

const AddToCartButton = ({ medicine }: { medicine: TMedicine }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addProduct(medicine));
  };

  return (
    <Button onClick={handleClick} variant="outline" className="flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
