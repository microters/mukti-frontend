import CommonHero from "@/app/Component/UI/CommonHero";
// Assets
import BlogSidebar from "@/app/Component/Shared/BlogSidebar/BlogSidebar";
import { fetchBlogs } from "@/app/api/blog";
import BlogList from "@/app/Component/Blogs/BlogsList";

const Blog = async () => {
  const blogs = await fetchBlogs();

  return (
    <div>
      <CommonHero pageName="Our Blogs" />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BlogList blogs={blogs} />
          <div className="lg:col-span-1 space-y-6">
            <BlogSidebar blogs={blogs}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

