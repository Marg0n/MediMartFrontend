"use client";

import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import CustomButton from "@/components/shared/CustomButton";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const CartPage = () => {
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  return (
    <div className=" flex flex-col lg:grid grid-cols-12 gap-8 my-5 container mx-auto">
      <CartProducts />
      <Address />
      <PaymentDetails />
      {/* Optional: Add a "Clear Cart" button */}
      <div className="col-span-12 flex justify-center items-center mt-5">
        <CustomButton
          textName="Clear Cart"
          handleAnything={handleClearCart}
          className="w-[90%] text-xl font-semibold py-2!"
        />
      </div>
    </div>
  );
};

export default CartPage;
