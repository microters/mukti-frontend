import { fetchDepartments } from "@/app/api/department";
import Treatment from "@/app/Component/Treatment/Treatment";
import CommonHero from "@/app/Component/UI/CommonHero";

const Treatments = async () => {
  // Fetch departments data
  const departments = await fetchDepartments();

  return (
    <div>
      {/* Hero Area */}
      <CommonHero pageName="Our Treatments" />
      <Treatment departments={departments} />
    </div>
  );
};

export default Treatments;
