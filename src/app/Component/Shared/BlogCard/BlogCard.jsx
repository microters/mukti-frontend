'use client';
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const BlogCard = ({ post }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const blogsData = post.translations?.[currentLanguage] || {};
  const blogImage = post.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${post.image}`
    : "/default-profile-photo.png";
  const singleBlogLink = blogsData.slug ? `/blog/${blogsData.slug}` : "#";

  return (
    <div className="shadow-md rounded-xl overflow-hidden">
      <div className="overflow-hidden">
        <Link href={"#"}>
          <Image
            src={blogImage}
            alt={blogsData.name || "Blog Image"}
            width={600}
            height={600}
            className="transition-all duration-300 hover:scale-110 w-full"
          />
        </Link>
      </div>
      <div className="px-5 py-5 space-y-3">
        <h3 className="text-xl line-clamp-2">
          <Link href={singleBlogLink}>{blogsData.title}</Link>
        </h3>
        <p className="bg-[#009650]/10 border-l-2 border-M-primary-color py-3 px-4 rounded text-M-text-color text-sm font-semibold">
          {blogsData.category?.name}
        </p>
        <p className="text-M-text-color line-clamp-3">
          {blogsData.description}
        </p>
        <div className="border-t border-[#F8FBFE] pt-3 flex items-center flex-wrap gap-4">
          <p className="flex items-center gap-2 text-sm text-M-text-color bg-[#F8FBFE] py-2 px-2 rounded hover:bg-M-heading-color transition-all duration-300 hover:text-white group">
            <Icon
              icon="lets-icons:user-light"
              width="24"
              className="text-M-heading-color shrink-0 group-hover:text-white transition-all duration-300"
            />
            Admin
          </p>
          <p className="flex items-center gap-2 text-sm text-M-text-color bg-[#F8FBFE] py-2 px-2 rounded hover:bg-M-heading-color transition-all duration-300 hover:text-white group">
            <Icon
              icon="tdesign:chat-bubble-1"
              width="24"
              className="text-M-heading-color shrink-0 group-hover:text-white transition-all duration-300"
            />
            8 Comments
          </p>
          <p className="flex items-center gap-2 text-sm text-M-text-color bg-[#F8FBFE] py-2 px-2 rounded hover:bg-M-heading-color transition-all duration-300 hover:text-white group">
            <Icon
              icon="flowbite:calendar-month-outline"
              width="24"
              className="text-M-heading-color shrink-0 group-hover:text-white transition-all duration-300"
            />
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
