"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/constants/cities";
import { setCity, setShippingAddress } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Address = () => {
  const dispatch = useAppDispatch();
  const { city, shippingAddress } = useAppSelector((state) => state.cart);

  const handleCitySelect = (selectedCity: string) => {
    dispatch(setCity(selectedCity));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setShippingAddress(e.target.value));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 p-5">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Address</h1>
        <p className="text-gray-500">Enter your address.</p>
        <div className="mt-5">
          <Select value={city} onValueChange={handleCitySelect}>
            <SelectTrigger className="mb-5 w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm mb-2 text-gray-500">Enter Delivery Address:</p>
          <textarea
            className="w-full border rounded-xl p-2"
            value={shippingAddress}
            onChange={handleAddressChange}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
