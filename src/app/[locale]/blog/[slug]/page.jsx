
import { fetchBlogs } from "@/app/api/blog";
import SingleBlog from "@/app/Component/SingleBlog/SingleBlog";
const SingleBlogPage = async () => {
  const blogs = await fetchBlogs();

  return <SingleBlog blogs={blogs} />;
};

export default SingleBlogPage;
