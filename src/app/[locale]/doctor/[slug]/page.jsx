import SingleDoctorInfo from "@/app/Component/SingleDoctor/SingleDoctorInfo";
import { fetchDoctorBySlug } from "@/app/api/doctor";
import { notFound } from "next/navigation";

const SingleDoctorPage = async ({ params }) => {
  const { slug } = params;

  if (!slug) return notFound();

  // Fetch doctor data based on slug and current language
  const doctor = await fetchDoctorBySlug(slug); // Make sure this function handles language too

  if (!doctor) return notFound();

  return (
    <div>
      {/* Pass the fetched doctor data to SingleDoctorInfo */}
      <SingleDoctorInfo key={doctor.id} doctor={doctor} />
    </div>
  );
};

export default SingleDoctorPage;

