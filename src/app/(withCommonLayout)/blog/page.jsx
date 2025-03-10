import CommonHero from "@/app/Component/UI/CommonHero";
import React from "react";

// Assets
import blogImg1 from "@/assets/images/blog1.png";
import blogImg2 from "@/assets/images/blog2.jpg";
import blogImg3 from "@/assets/images/blog3.jpg";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
const blogPosts = [
  {
    id: 1,
    title: "Having overweight and depression can affect your health.",
    category: "Pulmonologist",
    description:
      "Phasellus consectetur ipsum eu augue viverra ornare vel sit amet massa. Nulla ultrices dignissim mauris a sagittis.",
    author: "Admin",
    comments: 2,
    date: "01-21-2021",
    image: blogImg1,
  },
  {
    id: 2,
    title: "The Importance of Regular Health Checkups.",
    category: "Cardiology",
    description:
      "Regular checkups can help detect potential health issues before they become severe. A proactive approach ensures better health.",
    author: "Admin",
    comments: 5,
    date: "02-10-2022",
    image: blogImg2,
  },
  {
    id: 3,
    title: "Mental Health Awareness: Tips for Stress Management",
    category: "Psychologist",
    description:
      "A balanced diet, regular exercise, and mindfulness can lead to a healthier and happier life. Learn how to make it work for you.",
    author: "Admin",
    comments: 3,
    date: "03-15-2023",
    image: blogImg3,
  },
  {
    id: 4,
    title: "Best Practices for a Healthy Lifestyle.",
    category: "Nutritionist",
    description:
      "Understanding stress and finding effective ways to cope with it can greatly improve your quality of life.",
    author: "Admin",
    comments: 6,
    date: "05-08-2022",
    image: blogImg1,
  },
];

// ✅ Pagination Logic (applies AFTER sorting)

const Blog = () => {
  return (
    <div>
      <CommonHero pageName="Our Blogs" />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogPosts.slice(0, 6).map((post) => (
                <div
                  key={post.id}
                  className="shadow-md rounded-xl overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <Link href={"#"}>
                      <Image
                        src={post.image}
                        alt="Blog Image"
                        className="transition-all duration-300 hover:scale-110 w-full"
                      />
                    </Link>
                  </div>
                  <div className="px-5 py-5 space-y-3">
                    <h3 className="text-xl line-clamp-2">
                      <Link href={"#"}>{post.title}</Link>
                    </h3>
                    <p className="bg-[#009650]/10 border-l-2 border-M-primary-color py-3 px-4 rounded text-M-text-color text-sm font-semibold">
                      {post.category}
                    </p>
                    <p className="text-M-text-color line-clamp-3">
                      {post.description}
                    </p>
                    <div className="border-t border-[#F8FBFE] pt-3 flex items-center flex-wrap gap-4 ">
                      <p className="flex items-center gap-2 text-sm text-M-text-color bg-[#F8FBFE] py-2 px-2 rounded hover:bg-M-heading-color transition-all duration-300 hover:text-white group">
                        <Icon
                          icon="lets-icons:user-light"
                          width="24"
                          className="text-M-heading-color shrink-0 group-hover:text-white transition-all duration-300"
                        />
                        {post.author}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-M-text-color bg-[#F8FBFE] py-2 px-2 rounded hover:bg-M-heading-color transition-all duration-300 hover:text-white group">
                        <Icon
                          icon="tdesign:chat-bubble-1"
                          width="24"
                          className="text-M-heading-color shrink-0 group-hover:text-white transition-all duration-300"
                        />
                        {post.comments} Comments
                      </p>
                      <p className="flex items-center gap-2 text-sm text-M-text-color bg-[#F8FBFE] py-2 px-2 rounded hover:bg-M-heading-color transition-all duration-300 hover:text-white group">
                        <Icon
                          icon="flowbite:calendar-month-outline"
                          width="24"
                          className="text-M-heading-color shrink-0 group-hover:text-white transition-all duration-300"
                        />
                        {post.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 Pagination */}
            <ul className="mt-10 px-5 py-3 flex items-center shadow shadow-M-primary-color/10 gap-2">
              {/* Left Arrow */}
              <li className="size-11 inline-flex items-center justify-center bg-M-primary-color/10 rounded-full text-M-primary-color font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 cursor-pointer">
                <Icon
                  icon="material-symbols-light:keyboard-arrow-left"
                  width="24"
                />
              </li>

              {/* Page Numbers */}
              {[1, 2, 3, 4, 5].map((index) => (
                <li
                  key={index}
                  className="size-11 inline-flex items-center justify-center cursor-pointer rounded-full font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 text-M-primary-color bg-M-primary-color/10"
                >
                  {index}
                </li>
              ))}

              {/* Right Arrow */}
              <li className="size-11 inline-flex items-center justify-center bg-M-primary-color/10 rounded-full text-M-primary-color font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 cursor-pointer">
                <Icon
                  icon="material-symbols-light:keyboard-arrow-right"
                  width="24"
                />
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
