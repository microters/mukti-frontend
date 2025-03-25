'use client';
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const PopularBlogs = ({ post }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const blogsData = post.translations?.[currentLanguage] || {};
  const blogImage = post.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${post.image}`
    : "/default-profile-photo.png";
  const singleBlogLink = blogsData.slug ? `/blog/${blogsData.slug}` : "#";

  return (
    <div
    className="flex items-start gap-4 border-b border-M-text-color/20 py-4 last:border-0 last:pb-0"
  >
    <Image
      src={blogImage}
      width={96}
      height={96}
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
        8 Comments
      </span>
      <h4>
        <Link
          href={singleBlogLink}
          className="text-M-heading-color text-base hover:text-M-primary-color transition-all duration-300 line-clamp-2"
        >
          {blogsData.title}
        </Link>
      </h4>
    </div>
  </div>
  );
};

export default PopularBlogs;
