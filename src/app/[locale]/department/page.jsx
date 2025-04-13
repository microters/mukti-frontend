import { fetchDepartments } from "@/app/api/department";
import { fetchAboutData } from "@/app/api/dynamicData,";
import Treatment from "@/app/Component/Treatment/Treatment";
import CommonHero from "@/app/Component/UI/CommonHero";

const Treatments = async () => {
  // Fetch departments data
  const departments = await fetchDepartments();
  const dynamicAboutData = await fetchAboutData()

  return (
    <div>
      {/* Hero Area */}
      <CommonHero pageName="Our Treatments" />
      <Treatment departments={departments} aboutPage={dynamicAboutData} />
    </div>
  );
};

export default Treatments;
