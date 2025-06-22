'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import profileImage from "@/assets/images/profileAvatar.png";
import { Icon } from "@iconify/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { useTranslation } from "react-i18next";

const Testimonials = ({ reviews }) => {
    const { t, i18n } = useTranslation();
  return (
    <div className="py-12 lg:py-24">
    <div className="container mx-auto px-4">
      <SectionHeading 
        subtitle={t("testimonials.subtitle")}
        heading={t("testimonials.title")}
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
        {reviews.length === 0 ? (
          <div className="flex gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-[#EBF7F6] rounded-lg py-7 px-6 space-y-6">
                {/* Skeleton Loader for profile picture */}
                <div className="flex gap-4 items-start">
                  <Skeleton circle height={96} width={96} />
                  <div className="flex-1">
                    <Skeleton width={150} height={20} className="mb-2" />
                    <Skeleton width={100} height={15} />
                    <Skeleton width={80} height={30} className="mt-2" />
                  </div>
                </div>
                {/* Skeleton for review text */}
                <Skeleton height={60} width="100%" />
              </div>
            ))}
          </div>
        ) : (
          reviews.map((review) => {
            const reviewImage = review.image
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${review.image}`
              : "/default-profile-photo.png";
            return(
              <SwiperSlide key={review.id}>
              <div className="bg-[#EBF7F6] rounded-lg py-7 px-6 space-y-6">
                <div className="flex gap-4 items-start">
                  {/* Profile image */}
                  <Image
                    className="size-24 rounded-full border-8 border-white object-cover"
                    src={reviewImage}
                    alt={review.name}
                    width={96}
                    height={96}
                  />
                  <div>
                    <h3 className="text-M-heading-color text-xl m-0">{review.name}</h3>
                    <p className="text-M-text-color text-base font-jost mb-2 capitalize">{review.role}</p>
                    <p className="inline-flex gap-2 items-center py-2 px-4 bg-M-secondary-color text-white rounded-md text-base font-normal">
                      <Icon icon="mdi:star" width="20" /> {review.rating}
                    </p>
                  </div>
                </div>
                <p className="text-base text-M-text-color font-jost">{review.reviewText}</p>
              </div>
            </SwiperSlide>
            )
          } 
          )
        )}
      </Swiper>
    </div>
    </div>
    </div>
  );
};

export default Testimonials;
