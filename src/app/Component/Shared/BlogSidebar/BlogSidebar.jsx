import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import blogImg1 from "@/assets/images/blog1.png";
import blogImg2 from "@/assets/images/blog2.jpg";
import blogImg3 from "@/assets/images/blog3.jpg";

const BlogSidebar = () => {
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
      link: "/blog",
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
      link: "/blog",
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
      link: "/blog",
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
      link: "/blog",
    },
    {
      id: 5,
      title: "Best Practices for a Healthy Lifestyle.",
      category: "Nutritionist",
      description:
        "Understanding stress and finding effective ways to cope with it can greatly improve your quality of life.",
      author: "Admin",
      comments: 6,
      date: "05-08-2022",
      image: blogImg1,
      link: "/blog",
    },
  ];

  const socialLinks = [
    {
      id: 1,
      icon: "ri:facebook-fill",
      link: "#",
    },
    {
      id: 2,
      icon: "ri:twitter-x-fill",
      link: "#",
    },
    {
      id: 3,
      icon: "jam:pinterest",
      link: "#",
    },
    {
      id: 4,
      icon: "basil:linkedin-outline",
      link: "#",
    },
    {
      id: 5,
      icon: "hugeicons:instagram",
      link: "#",
    },
  ];

  // Count the number of posts for each category
  const categoryCount = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  // Get unique categories by using a Set
  const uniqueCategories = blogPosts.reduce((acc, post) => {
    if (!acc.some((item) => item.category === post.category)) {
      acc.push({ category: post.category, link: post.link });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-5">
      {/* Search Area */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <form className="flex items-center relative">
          <input
            type="text"
            placeholder="Search by keyword"
            className="font-jost font-normal text-base text-black w-full p-3 pr-10 border-0 outline-none ring-0 ring-M-primary-color/50 focus:ring-1 transition-all duration-300 rounded-sm "
          />
          <Icon
            icon="clarity:search-line"
            width="24"
            height="24"
            className="right-3 absolute top-1/2 -translate-y-1/2 text-M-text-color"
          />
        </form>
      </div>
      {/* Most Popular */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Most Popular</h3>
        {blogPosts.slice(0, 4).map((items, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border-b border-M-text-color/20 py-4 last:border-0 last:pb-0"
          >
            <Image
              src={items.image}
              alt="Blog Image"
              className="w-24 shrink-0 rounded-md"
            />

            <div>
              <span className="flex items-center gap-2 text-M-text-color font-jost text-base mb-1">
                <Icon
                  icon="iconoir:chat-lines"
                  width="18"
                  height="18"
                  className="text-M-primary-color/50"
                />{" "}
                {items.comments} Comments
              </span>
              <h4>
                <Link
                  href={"#"}
                  className="text-M-heading-color text-base hover:text-M-primary-color transition-all duration-300 line-clamp-2"
                >
                  {items.title}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
      {/* Category List */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Browse by Category</h3>
        <ul className="divide-y mt-4">
          {Object.keys(categoryCount).map((items, index) => (
            <li
              key={index}
              className="first:border-t first:border-M-text-color/10"
            >
              <Link
                href={"#"}
                className="flex items-center justify-between font-jost text-lg text-M-heading-color py-4 hover:text-M-primary-color group transition-all duration-300"
              >
                {items}{" "}
                <span className="size-7 flex items-center justify-center rounded-full bg-M-primary-color/60 text-white text-sm font-jost font-medium group-hover:bg-M-heading-color transition-all duration-200">
                  {String(categoryCount[items]).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Social Links */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Social Share</h3>
        <ul className=" flex flex-wrap gap-3 mt-4">
          {socialLinks.map((items, index) => (
            <li key={index}>
              <Link
                href={items.link}
                className="size-12 rounded-full bg-white text-M-text-color flex items-center justify-center hover:bg-M-primary-color hover:text-white transition-all duration-300"
              >
                <Icon icon={items.icon} width="24" height="24" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Tags */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Tags</h3>
        <ul className=" flex flex-wrap gap-3 mt-4">
          {uniqueCategories.map((items, index) => (
            <li key={index}>
              <Link
                href={items.link}
                className="rounded-sm font-jost font-normal px-3 py-2 bg-white text-M-text-color flex items-center justify-center hover:bg-M-primary-color hover:text-white transition-all duration-300"
              >
                {items.category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
