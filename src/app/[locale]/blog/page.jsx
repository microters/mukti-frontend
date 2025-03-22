import CommonHero from "@/app/Component/UI/CommonHero";
import { fetchBlogs } from "@/app/api/blog";
import BlogWrapper from "@/app/Component/Blogs/BlogWrapper";

const Blog = async () => {
  const blogs = await fetchBlogs();

  return (
    <div>
      <CommonHero pageName="Our Blogs" />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BlogWrapper blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Blog;

