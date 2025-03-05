import DoctorsList from "@/app/Component/Doctors/DoctorsList";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { fetchDoctors } from "@/app/api/doctor";

export default async function DoctorPage() {
  const doctors = await fetchDoctors(); // ✅ Fetch on the server before rendering

  console.log("Doctors Data:", doctors); 

  if (!doctors || doctors.length === 0) {
    return (
      <div>
        <HeroInnerPage />
        <div className="container py-24">
          <h1 className="text-3xl font-bold">Doctors List</h1>
          <p className="text-red-500">No doctors found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroInnerPage />
        {/* ✅ Pass doctors data to client component */}
        <DoctorsList doctors={doctors} />
    </div>
  );
}
