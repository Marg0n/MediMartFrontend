import UserDetailsPage from "@/components/modules/dashboard/admin/userDetails";
import { getSingleUser } from "@/services/users";

const UserDetailsAdminPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  // Fetch medicine details using the medicineId
  const { data: user } = await getSingleUser(userId);
  // console.log(user);
  return (
    <div>
      <UserDetailsPage user={user} />
    </div>
  );
};

export default UserDetailsAdminPage;
