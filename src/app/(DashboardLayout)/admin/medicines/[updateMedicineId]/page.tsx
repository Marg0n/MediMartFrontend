import UpdateMedicineForm from "@/components/modules/dashboard/admin/updateProduct";
import { getSingleProduct } from "@/services/Product";

const UpdateMedicinePage = async ({
  params,
}: {
  params: Promise<{ updateMedicineId: string }>;
}) => {
  const { updateMedicineId } = await params;
  // Fetch medicine details using the medicineId
  const { data: medicine } = await getSingleProduct(updateMedicineId);
  // console.log(medicine);
  return (
    <div>
      <UpdateMedicineForm medicine={medicine} />
    </div>
  );
};

export default UpdateMedicinePage;
