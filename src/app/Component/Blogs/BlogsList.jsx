"use client";
import BlogCard from "@/app/Component/Shared/BlogCard/BlogCard";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const BlogList = ({ blogs, itemsPerPage = 6 }) => {
  console.log(blogs)
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Get current blogs for the page
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="lg:col-span-2">
      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentBlogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <ul className="mt-10 px-5 py-3 flex flex-wrap items-center shadow shadow-M-primary-color/10 gap-2">
          {/* Left Arrow */}
          <li
            onClick={() => handlePageChange(currentPage - 1)}
            className={`size-11 inline-flex items-center justify-center rounded-full font-jost font-bold transition-all duration-300 cursor-pointer shrink-0
              ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-M-primary-color/10 text-M-primary-color hover:bg-M-primary-color hover:text-white"}`}
          >
            <Icon icon="material-symbols-light:keyboard-arrow-left" width="24" />
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              onClick={() => handlePageChange(page)}
              className={`size-11 inline-flex items-center justify-center cursor-pointer rounded-full font-jost font-bold transition-all duration-300 shrink-0
                ${currentPage === page ? "bg-M-primary-color text-white" : "bg-M-primary-color/10 text-M-primary-color hover:bg-M-primary-color hover:text-white"}`}
            >
              {page}
            </li>
          ))}

          {/* Right Arrow */}
          <li
            onClick={() => handlePageChange(currentPage + 1)}
            className={`size-11 inline-flex items-center justify-center rounded-full font-jost font-bold transition-all duration-300 cursor-pointer shrink-0
              ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "bg-M-primary-color/10 text-M-primary-color hover:bg-M-primary-color hover:text-white"}`}
          >
            <Icon icon="material-symbols-light:keyboard-arrow-right" width="24" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default BlogList;

