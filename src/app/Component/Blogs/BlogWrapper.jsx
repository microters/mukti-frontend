'use client';

import React, { useState } from "react";
import BlogList from "./BlogsList";
import BlogSidebar from "../Shared/BlogSidebar/BlogSidebar";
import { useTranslation } from "react-i18next";

const BlogWrapper = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  // Client-side search filtering
  const filteredBlogs = blogs.filter((post) => {
    const translation = post.translations?.[currentLanguage];
    if (!translation) return false;

    const title = translation.title?.toLowerCase() || "";
    const category = translation.category?.name?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return title.includes(query) || category.includes(query);
  });

  return (
    <>
      <BlogList blogs={filteredBlogs} />
      <div className="lg:col-span-1 space-y-6">
        <BlogSidebar
          blogs={blogs}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </>
  );
};

export default BlogWrapper;
