'use client'
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";
import searchIcon from "@/assets/images/search.png";
import departmentIcon from "@/assets/images/department.png";
import doctorIcon from "@/assets/images/doctor.png";
import waveImag from "@/assets/images/heroWaveShape.png";
import tabletIcon from "@/assets/images/tablet.png";
import injectionIcon from "@/assets/images/injection.png";
import penToolIcon from "@/assets/images/pen-tool.png";
import crossShapeIcon from "@/assets/images/cross-shape.png";
import { useTranslation } from "react-i18next";
import { fetchDepartments } from "@/app/api/department";
import { fetchDoctors } from "@/app/api/doctor";

const Hero = ({ heroSection }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const searchBoxRef = useRef(null);
  const currentLanguage = i18n.language || "en";
  const { prefix, title, backgroundImage } = heroSection?.translations[currentLanguage] || {};
  const heroImage = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${backgroundImage.replace(/\\/g, '/')}`;

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const departmentData = await fetchDepartments(currentLanguage);
      setDepartments(departmentData);
      const doctorData = await fetchDoctors(currentLanguage);
      setDoctors(doctorData);
      setFilteredDoctors(doctorData);
      setAllDoctors(doctorData);
    };
    fetchData();
  }, [currentLanguage]);

  const handleDepartmentChange = async (event) => {
    const departmentId = event.target.value;
    setSelectedDepartment(departmentId);
    setSelectedDoctor('');
  
    if (departmentId) {
      const doctorData = await fetchDoctors(currentLanguage);
      const selectedDepartmentObj = departments.find(dep => dep.id === departmentId);
      const selectedDepartmentName = selectedDepartmentObj?.translations[currentLanguage]?.name;
  
      if (!selectedDepartmentName) {
        console.error("No matching department name found for ID:", departmentId);
        setDoctors([]);
        return;
      }
  
      const filteredDoctors = doctorData.filter(doctor => 
        doctor.translations[currentLanguage]?.department === selectedDepartmentName
      );
  
      setDoctors(filteredDoctors);
      setFilteredDoctors(filteredDoctors);
      toast.info("Please select a doctor after choosing a department.", { position: "top-right" });
    } else {
      setDoctors(filteredDoctors);
    }
  };

  const handleDoctorFieldFocus = () => {
    if (!selectedDepartment) {
      setDoctors(allDoctors);
      setFilteredDoctors(allDoctors);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);

    if (query.length > 0) {
      setFilteredDoctors(doctors.filter(doctor => 
        doctor.translations[currentLanguage]?.name.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredDoctors(doctors);
    }
  };

  const handleDoctorClick = (doctor) => {
    setShowDropdown(false);
    setSearchQuery(doctor.translations[currentLanguage]?.name || doctor.name);
    router.push(`/doctor/${doctor.slug}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedDoctor) {
      toast.error("Please select a doctor before submitting!", { position: "top-right" });
      return;
    }
    const doctor = doctors.find(doc => doc.id === selectedDoctor);
    handleDoctorClick(doctor);
  };
  return (
    <div className="bg-cover bg-top" style={{ backgroundImage: `url(${heroImage})` }}>
      <ToastContainer />
    <div className="pt-[60px] lg:pt-[180px] pb-20 md:pb-32 lg:pb-[300px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
      {/* Shapes */}
      <Image
        src={tabletIcon}
        alt="shape"
        className="left-[10%] top-[10%] absolute animate-spin hidden lg:block"
      />
      <Image
        src={injectionIcon}
        alt="shape"
        className="left-[3%] bottom-[30%] absolute animate-pulse hidden lg:block"
      />
      <Image
        src={penToolIcon}
        alt="shape"
        className="right-[10%] bottom-[30%] absolute animate-pulse hidden lg:block"
      />
      <Image
        src={crossShapeIcon}
        alt="shape"
        className="right-[5%] top-[20%] absolute animate-spin hidden lg:block"
      />
      <Image
        src={waveImag}
        alt="wavwe Shape"
        className="absolute -bottom-1 left-0  w-full"
      />
      <div className="container mx-auto text-center">
        <span className="font-jost font-medium leading-4 tracking-wider text-base text-white mb-4 block uppercase">
          {prefix}
        </span>
        <h1 className="font-jost font-bold !leading-[1.4] text-3xl md:text-6xl text-white max-w-[724px] mx-auto tracking-[4px] ">
          {title}
        </h1>
          <form className="mt-8 bg-white/10 p-4 rounded-md" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 justify-between items-center bg-white px-8 py-7 lg:py-3 rounded-md">
            <div className="relative w-full max-w-xs mx-auto" ref={searchBoxRef}>
            <div className="flex items-center gap-2 relative before:hidden lg:before:block before:absolute before:w-[1px] before:h-full before:bg-slate-300 before:-right-[15px]">
                <Image src={searchIcon} alt="searchIcon" className="w-6" />
                <input 
                  type="text" 
                  placeholder="Search Doctors..." 
                  className="w-full px-2 outline-none"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              {showDropdown && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 z-10 transition-all duration-200 w-full max-w-xs">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <div 
                        key={doctor.id} 
                        className="p-2 cursor-pointer hover:bg-gray-100 text-left"
                        onClick={() => handleDoctorClick(doctor)}
                      >
                        {doctor.translations[currentLanguage]?.name || doctor.name}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
               <div className="flex items-center gap-2 relative before:hidden lg:before:block before:absolute before:w-[1px] before:h-full before:bg-slate-300 before:-right-[15px]">
                <Image src={departmentIcon} alt="searchIcon" className="w-6" />
                <select name="department" id="department" className="w-full outline-none ring-0 py-2 cursor-pointer text-M-text-color" onChange={handleDepartmentChange}>
                  <option value="">Select a Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.translations[currentLanguage]?.name || department.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Image src={doctorIcon} alt="searchIcon" className="w-6" />
                <select name="doctor" id="doctor" className="w-full outline-none ring-0 py-2 cursor-pointer text-M-text-color" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}   onFocus={handleDoctorFieldFocus}>
                  <option value="">Select Doctor...</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.translations[currentLanguage]?.name || doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <FormButton buttonText="Submit" buttonColor="bg-M-secondary-color" textColor="text-white" borderColor="bg-M-secondary-color" padding="py-3 px-8 lg:w-auto" fontSize="text-lg" alignment="text-center md:text-right" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
