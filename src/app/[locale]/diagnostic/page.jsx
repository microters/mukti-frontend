import { fetchDynamicData } from "@/app/api/dynamicHome,";
import DiagnosticContent from "@/app/Component/Shared/DiagnosticContent/DiagnosticContent";

const Diagnostic = async () => {
  // Fetch data on the server
  const dynamicData = await fetchDynamicData();
  const whyChooseUsSection = dynamicData?.whyChooseUsSection || {};

  return <DiagnosticContent dynamicData={dynamicData} whyChooseUsSection={whyChooseUsSection} />;
};

export default Diagnostic;
