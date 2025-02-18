"use client";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Assets
import clientImage from "@/assets/images/client1.png";
import clientImage2 from "@/assets/images/client2.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";

const testimonials = [
  {
    id: 1,
    name: "Adam Riky",
    role: "Patient",
    rating: 5.0,
    review:
      "The doctors here are highly skilled, and the service is outstanding. I felt very comfortable during my treatment and would definitely recommend it to others!",
    image: clientImage,
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Patient",
    rating: 4.8,
    review:
      "Exceptional care! The staff was very friendly, and they made sure I was comfortable throughout my visit. Highly recommended!",
    image: clientImage2,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Client",
    rating: 4.9,
    review:
      "I had an amazing experience! The team was professional, and the facility was top-notch. I appreciate the personalized approach to my health.",
    image: clientImage,
  },
  {
    id: 4,
    name: "Sophia Williams",
    role: "Visitor",
    rating: 4.7,
    review:
      "I brought my family member here, and I was impressed with how well they were treated. The staff is caring and attentive.",
    image: clientImage,
  },
  {
    id: 5,
    name: "Daniel Smith",
    role: "Customer",
    rating: 4.6,
    review:
      "Great experience! The waiting time was minimal, and the treatment I received was excellent. Definitely coming back for future checkups.",
    image: clientImage2,
  },
  {
    id: 6,
    name: "Jessica White",
    role: "Patient",
    rating: 5.0,
    review:
      "A wonderful experience! The environment was very welcoming, and the doctors took the time to answer all my questions.",
    image: clientImage,
  },
  {
    id: 7,
    name: "David Wilson",
    role: "Client",
    rating: 4.8,
    review:
      "From the moment I walked in, I felt at ease. The team is fantastic, and the level of care is outstanding. Highly recommend!",
    image: clientImage2,
  },
];

const Testimonials = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          subtitle="Testimonials"
          heading="What client’s say?"
          align="center"
        />
        <div className="mt-10">
          <Swiper
            slidesPerView={3}
            spaceBetween={40}
            navigation={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            modules={[Navigation, Autoplay]}
            className="mySwiper sm:!px-9"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-[#EBF7F6] rounded-lg py-7 px-6 space-y-6">
                  <div className="flex gap-4 items-start">
                    <Image
                      className="size-24 rounded-full border-8 border-white"
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                    />
                    <div>
                      <h3 className="text-M-heading-color text-xl m-0">
                        {testimonial.name}
                      </h3>
                      <p className="text-M-text-color text-base font-jost mb-2 capitalize">
                        {testimonial.role}
                      </p>
                      <p className="inline-flex gap-2 items-center py-2 px-4 bg-M-secondary-color text-white rounded-md text-base font-normal">
                        <Icon icon="mdi:star" width="20" /> {testimonial.rating}
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-M-text-color font-jost">
                    {testimonial.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
