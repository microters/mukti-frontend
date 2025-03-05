import SingleDoctorInfo from "@/app/Component/SingleDoctor/SingleDoctorInfo";
import { fetchDoctorBySlug } from "@/app/api/doctor";
import { notFound } from "next/navigation";

const SingleDoctorPage = async ({ params }) => {
  const { slug } = params;

  if (!slug) return notFound();

  const doctor = await fetchDoctorBySlug(slug);

  if (!doctor) return notFound();

  return (
    <div>
      <SingleDoctorInfo key={doctor.id} doctor={doctor} />
    </div>
  );
};

export default SingleDoctorPage;


