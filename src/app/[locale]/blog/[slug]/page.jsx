import { fetchBlogs, fetchBlogsBySlug } from "@/app/api/blog";
import SingleBlog from "@/app/Component/SingleBlog/SingleBlog";
const SingleBlogPage = async ({params}) => {
  const { slug } = params;
  if (!slug) return notFound();

  const blogs = await fetchBlogs();
  const singleBlogs = await fetchBlogsBySlug(slug)
    if (!singleBlogs) return notFound();

  return <SingleBlog blogs={blogs} singleBlogs={singleBlogs} />;
};

export default SingleBlogPage;
