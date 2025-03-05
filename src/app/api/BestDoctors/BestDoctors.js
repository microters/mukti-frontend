import { fetchClient } from "../fetchClient";

export const getDoctorsData = async () => {
  const data = await fetchClient("/api/doctor");
  if (!data || data.length === 0) return { doctors: [], departments: { en: [], bn: [] } };

  // Extract unique department names separately for English & Bengali
  const uniqueDepartments = {
    en: [
      ...new Set(
        data.map((doctor) => doctor?.translations?.en?.department?.trim()).filter(Boolean)
      ),
    ],
    bn: [
      ...new Set(
        data.map((doctor) => doctor?.translations?.bn?.department?.trim()).filter(Boolean)
      ),
    ],
  };

  // Map over the doctors' data to handle profile photos
  const updatedDoctors = data.map((doctor) => ({
    ...doctor,
    icon: doctor.icon
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
      : "/default-profile-photo.png", // Ensure a fallback image
  }));

  return { doctors: updatedDoctors, departments: uniqueDepartments };
};

