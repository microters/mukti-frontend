import CommonHero from "@/app/Component/UI/CommonHero";
import AppointmentForm from "@/app/Component/Shared/AppointmentForm/AppointmentForm";

const Appointment = () => {
  return (
    <div>
      <CommonHero pageName="Appointment" />

      <div className="container mx-auto px-4 md:px-0 my-24">


        <div className="bg-slate-100 p-10 mt-10 max-w-[720px] rounded-xl border border-M-text-color/20">
           <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
