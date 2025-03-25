import CommonHero from "@/app/Component/UI/CommonHero";
import { fetchBlogs } from "@/app/api/blog";
import BlogWrapper from "@/app/Component/Blogs/BlogWrapper";
import { fetchDepartments } from "@/app/api/department";

const Blog = async () => {
  const blogs = await fetchBlogs();
  const departments = await fetchDepartments()

  return (
    <div>
      <CommonHero pageName="Our Blogs" />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BlogWrapper blogs={blogs} departments={departments}/>
        </div>
      </div>
    </div>
  );
};

export default Blog;

