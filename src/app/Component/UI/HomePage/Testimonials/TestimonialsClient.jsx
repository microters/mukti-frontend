"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
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

const TestimonialsClient = ({ initialReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(reviews)

  useEffect(() => {
    // Simulate loading state for reviews
    setTimeout(() => {
      setReviews(initialReviews);
      setLoading(false);
    }, 1500);
  }, [initialReviews]);

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
            {loading ? (
              // Skeleton loader while loading reviews
              <div className="flex gap-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-[#EBF7F6] rounded-lg py-7 px-6 space-y-6">
                    <div className="flex gap-4 items-start">
                      <Skeleton circle height={96} width={96} />
                      <div className="flex-1">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={100} height={15} className="my-2" />
                        <Skeleton width={80} height={30} />
                      </div>
                    </div>
                    <Skeleton height={60} width="100%" />
                  </div>
                ))}
              </div>
            ) : (
              // Show actual reviews once data is fetched
              reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="bg-[#EBF7F6] rounded-lg py-7 px-6 space-y-6">
                    <div className="flex gap-4 items-start">
                      <Image
                        className="size-24 rounded-full border-8 border-white"
                        // src={review.image}
                        src={profileImage}
                        alt={review.name}
                        width={96}
                        height={96}
                      />
                      <div>
                        <h3 className="text-M-heading-color text-xl m-0">{review.name}</h3>
                        <p className="text-M-text-color text-base font-jost mb-2 capitalize">
                          {review.role}
                        </p>
                        <p className="inline-flex gap-2 items-center py-2 px-4 bg-M-secondary-color text-white rounded-md text-base font-normal">
                          <Icon icon="mdi:star" width="20" /> {review.rating}
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-M-text-color font-jost">{review.reviewText}</p>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsClient;
