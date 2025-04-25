import ProductDetails from "@/components/modules/products/AllProduct/productDetailsCard";
import { getSingleProduct } from "@/services/Product";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) => {
  const { medicineId } = await params;
  // Fetch medicine details using the medicineId
  const { data: medicine } = await getSingleProduct(medicineId);
  // console.log(medicine);
  return (
    <div>
      <ProductDetails medicine={medicine} />
    </div>
  );
};

export default MedicineDetailsPage;
