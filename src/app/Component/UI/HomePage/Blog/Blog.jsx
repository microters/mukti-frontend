import BlogCard from "@/app/Component/Shared/BlogCard/BlogCard";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import React from "react";

const Blog = ({ blogs}) => {
  return (
    <div className="py-12 lg:py-24">
      <div className="container">
        <SectionHeading subtitle="From the Blog" heading="News & articles" align="center" />
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
