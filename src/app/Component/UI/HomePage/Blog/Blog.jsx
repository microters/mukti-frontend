"use client"
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

// Assets
import blogImg1 from "@/assets/images/blog1.png";
import blogImg2 from "@/assets/images/blog2.jpg";
import blogImg3 from "@/assets/images/blog3.jpg";
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

const Blog = () => {
  return (
    <div className="py-24">
      <div className="container">
        <SectionHeading
          subtitle="From the Blog"
          heading="News & articles"
          align="center"
        />
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="shadow-md rounded-xl overflow-hidden">
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
      </div>
    </div>
  );
};

export default Blog;
