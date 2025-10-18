// Blog.jsx (FIXED)

// 🔴 "use client", useState, useEffect বাদ
import BlogCard from "@/app/Component/Shared/BlogCard/BlogCard";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import React from "react";
import { fetchBlogs } from "@/app/api/blog"; // ✅ API ইম্পোর্ট
import initTranslations from "@/i18n"; // ✅ সার্ভার-সাইড i18n

// ✅ 1. async করুন এবং props থেকে 'locale' নিন
const Blog = async ({ locale }) => {
  // ✅ 2. সার্ভারে ডেটা fetch করুন
  const blogs = await fetchBlogs(locale);
  
  // ✅ 3. সার্ভারে translation লোড করুন
  const { t } = await initTranslations(locale, ['home']); // 'home' namespace

  return (
    <div className="py-12 lg:py-24">
      <div className="container">
        <SectionHeading
          heading={t("blog.title")} 
          align="center"
          subtitle={t("blog.subtitle")}
        />
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* ✅ 4. সরাসরি fetched 'blogs' ব্যবহার করুন */}
          {blogs?.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;