// import BlogCard from "@/app/Component/Shared/BlogCard/BlogCard";
// import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
// import React from "react";

// const Blog = ({ blogs}) => {
//   return (
//     <div className="py-12 lg:py-24">
//       <div className="container">
//         <SectionHeading subtitle="From the Blog" heading="News & articles" align="center" />
//         <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {blogs.slice(0, 3).map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;

"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "@/app/Component/Shared/BlogCard/BlogCard";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { fetchBlogs } from "@/app/api/blog";
import { useTranslation } from "react-i18next";

const Blog = ({ blogs }) => {
  const { t, i18n } = useTranslation();
  const [blogData, setBlogData] = useState(blogs || []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const freshBlogs = await fetchBlogs();

        if (JSON.stringify(freshBlogs) !== JSON.stringify(blogData)) {
          setBlogData(freshBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [blogData]);

  return (
    <div className="py-12 lg:py-24">
      <div className="container">
        <SectionHeading
          heading={t("blog.title")} 
          align="center"
          subtitle={t("blog.subtitle")}
        />
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogData.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;


