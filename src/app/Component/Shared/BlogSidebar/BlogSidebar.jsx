'use client'
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import PopularBlogs from "../BlogCard/PopularBlogs";

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const BlogSidebar = ({ blogs }) => {
  const currentLanguage = "en"; // Change based on language selection logic

  const socialLinks = [
    { id: 1, icon: "ri:facebook-fill", link: "#" },
    { id: 2, icon: "ri:twitter-x-fill", link: "#" },
    { id: 3, icon: "jam:pinterest", link: "#" },
    { id: 4, icon: "basil:linkedin-outline", link: "#" },
    { id: 5, icon: "hugeicons:instagram", link: "#" },
  ];

  // Count the number of posts for each category
  const categoryCount = blogs.reduce((acc, post) => {
    const categoryName = post.translations?.[currentLanguage]?.category?.name || "Uncategorized";
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  // Get unique categories
  const uniqueCategories = Object.keys(categoryCount).map((category) => ({
    category,
    count: categoryCount[category],
  }));

  // Shuffle and get random blogs
  const randomBlogs = shuffleArray(blogs).slice(0, 4);

  return (
    <div className="space-y-5">
      {/* Search Area */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <form className="flex items-center relative">
          <input
            type="text"
            placeholder="Search by keyword"
            className="font-jost font-normal text-base text-black w-full p-3 pr-10 border-0 outline-none ring-0 ring-M-primary-color/50 focus:ring-1 transition-all duration-300 rounded-sm"
          />
          <Icon
            icon="clarity:search-line"
            width="24"
            height="24"
            className="right-3 absolute top-1/2 -translate-y-1/2 text-M-text-color"
          />
        </form>
      </div>

      {/* Most Popular (Random Blogs) */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Most Popular</h3>
        {randomBlogs.map((post) => (
          <PopularBlogs key={post.id} post={post} />
        ))}
      </div>

      {/* Category List */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Browse by Category</h3>
        <ul className="divide-y mt-4">
          {uniqueCategories.map((item, index) => (
            <li key={index} className="first:border-t first:border-M-text-color/10">
              <Link
                href={"#"}
                className="flex items-center justify-between font-jost text-lg text-M-heading-color py-4 hover:text-M-primary-color group transition-all duration-300"
              >
                {item.category}
                <span className="size-7 flex items-center justify-center rounded-full bg-M-primary-color/60 text-white text-sm font-jost font-medium group-hover:bg-M-heading-color transition-all duration-200">
                  {String(item.count).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social Links */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Social Share</h3>
        <ul className="flex flex-wrap gap-3 mt-4">
          {socialLinks.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="size-12 rounded-full bg-white text-M-text-color flex items-center justify-center hover:bg-M-primary-color hover:text-white transition-all duration-300"
              >
                <Icon icon={item.icon} width="24" height="24" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-M-section-bg p-6 rounded-md">
        <h3 className="text-2xl text-black mb-2">Tags</h3>
        <ul className="flex flex-wrap gap-3 mt-4">
          {uniqueCategories.map((item, index) => (
            <li key={index}>
              <Link
                href="#"
                className="rounded-sm font-jost font-normal px-3 py-2 bg-white text-M-text-color flex items-center justify-center hover:bg-M-primary-color hover:text-white transition-all duration-300"
              >
                {item.category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
