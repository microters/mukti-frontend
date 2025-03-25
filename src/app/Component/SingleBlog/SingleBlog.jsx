'use client'
import BlogSidebar from "@/app/Component/Shared/BlogSidebar/BlogSidebar";
import authorImage from "@/assets/images/client2.png";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SingleBlog = ({ blogs, singleBlogs }) => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const translations = singleBlogs.translations[currentLanguage] || singleBlogs.translations["en"];
    const blogImage = singleBlogs.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${singleBlogs.image}`
    : "/default-profile-photo.png";

     const createdAt = new Date(singleBlogs.createdAt);

     // Format the Date to display only the date (e.g., March 24, 2025)
     const formattedDate = createdAt.toLocaleDateString();
 
     // Format the Time to display only the time (e.g., 12:30 PM)
     const formattedTime = createdAt.toLocaleTimeString([], {
         hour: '2-digit',
         minute: '2-digit',
         hour12: true, 
     });

// Function to extract headings without numbers (for Table of Contents)
const extractHeadings = (content) => {
  const headingRegex = /<(h2|h3)>(.*?)<\/\1>/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const headingText = match[2];
    const id = headingText.replace(/\s+/g, '-').toLowerCase();

    const cleanHeadingText = headingText.replace(
      /^\d+(?:\.\d+)*[.)]?\s*/,
      ""
    );

    headings.push({
      text: cleanHeadingText,
      id,
    });
  }

  return headings;
};


// Function to add IDs to the content headings
const addIdsToContent = (content) => {
    return content.replace(/<(h2|h3)>(.*?)<\/\1>/g, (match, p1, p2) => {
        const id = p2.replace(/\s+/g, '-').toLowerCase();
        return `<${p1} id="${id}">${p2}</${p1}>`;
    });
};

const [contentWithIds, setContentWithIds] = useState("");

useEffect(() => {
    // Add IDs to content when the component is mounted
    const newContent = addIdsToContent(translations?.content || "");
    setContentWithIds(newContent);
}, [translations]);

const headings = extractHeadings(translations?.content || []);

  // State for showing/hiding Table of Contents
  const [isTableOfContentsVisible, setIsTableOfContentsVisible] = useState(true);

  // For the height animation
  const [tocHeight, setTocHeight] = useState(0);
  const tocRef = useRef(null);

  useEffect(() => {
    if (tocRef.current) {
      setTocHeight(tocRef.current.scrollHeight);
    }
  }, [headings, isTableOfContentsVisible]);

  return (
    <div>
      {/* Hero Area */}
      <div className="pt-[80px] lg:pt-[100px] pb-20 md:pb-32 lg:pb-[120px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="rounded-2xl">
            <Image
              src={blogImage}
              alt="blog Feature Image"
              width={600}
              height={600}
              className="rounded-2xl"
            />
          </div>
          <div className="col-span-2 space-y-4">
            <span className="px-4 py-2 bg-M-heading-color text-sm md:text-base text-white font-jost font-medium uppercase inline-block rounded-md">
              {translations.category?.name}
            </span>
            <h1 className="text-2xl md:text-4xl text-white">
              {translations?.title}
            </h1>
            <p className="text-base text-white/80 font-jost">
              {translations?.description}
            </p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                <Icon icon="solar:pen-2-linear" width="24" height="24" />{" "}
                <Image
                  src={authorImage}
                  alt="Author Image"
                  width={35}
                  height={35}
                  className="rounded-full shrink-0 border border-M-heading-color"
                />{" "}
                By Admin
              </li>
              <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                <Icon icon="oui:token-date" width="30" height="30" /> {formattedDate}
              </li>
              <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                <Icon icon="lucide:alarm-clock" width="24" height="24" /> {formattedTime}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container max-auto py-10 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="">
              {/* Table of Contents */}
                <div className="border border-slate-200 p-6 rounded-md">
                    <div className="flex justify-between items-center rounded-md overflow-hidden">
              <h3
                onClick={() => setIsTableOfContentsVisible(!isTableOfContentsVisible)}
                className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full cursor-pointer"
              >
                Table of Contents
                <span>
                  <Icon icon="solar:alt-arrow-down-linear" width="24" className={`transition-all duration-300 ${isTableOfContentsVisible ? "-rotate-180" : "" } `} />
                </span>
              </h3>
                    </div>
                  <div
                    ref={tocRef}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      height: isTableOfContentsVisible ? `${tocHeight}px` : "0px",
                    }}
                  >
                    <ul className="mt-5">
                  {headings.map((heading, index) => (
                    <li key={heading.id} className="flex justify-between items-center gap-3 cursor-pointer py-2 border-b border-M-primary-color/10 last:border-0 text-slate-400 font-jost">
                      <Link href={`#${heading.id}`} scroll={true}>
                      {index + 1}. {heading.text}
                      </Link>
                    </li>
                  ))}
                </ul>
                    </div>
                </div>
            <div
                dangerouslySetInnerHTML={{ __html: contentWithIds || "No content available." }}
                className="jodit-description mt-5"
            />
              {/* Show Commnets Area */}
              <div className="border border-M-text-color/50 p-6 rounded-lg mt-10">
                <h2 className="text-2xl md:text-3xl">02 Comments</h2>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5">
                  <Image
                    src={authorImage}
                    alt="User Image"
                    width={50}
                    height={50}
                    className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0"
                  />
                  <div>
                    <h4 className="font-normal text-M-heading-color mb-2">
                      Jhone Doe{" "}
                      <span className="text-M-text-color">
                        Feb 9, 2023 at 10:23
                      </span>{" "}
                      <span>
                        <Link href={"#comments"}>- Reply</Link>
                      </span>
                    </h4>
                    <p className="text-M-text-color font-jost">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque at magna ut ante eleifend eleifend.
                    </p>
                  </div>
                </div>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5 ml-10">
                  <Image
                    src={authorImage}
                    alt="User Image"
                    width={50}
                    height={50}
                    className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0"
                  />
                  <div>
                    <h4 className="font-normal text-M-heading-color mb-2">
                      Jhone Doe{" "}
                      <span className="text-M-text-color">
                        Feb 9, 2023 at 10:23
                      </span>{" "}
                      <span>
                        <Link href={"#comments"}>- Reply</Link>
                      </span>
                    </h4>
                    <p className="text-M-text-color font-jost">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque at magna ut ante eleifend eleifend.
                    </p>
                  </div>
                </div>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5">
                  <Image
                    src={authorImage}
                    alt="User Image"
                    width={50}
                    height={50}
                    className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0"
                  />
                  <div>
                    <h4 className="font-normal text-M-heading-color mb-2">
                      Jhone Doe{" "}
                      <span className="text-M-text-color">
                        Feb 9, 2023 at 10:23
                      </span>{" "}
                      <span>
                        <Link href={"#comments"}>- Reply</Link>
                      </span>
                    </h4>
                    <p className="text-M-text-color font-jost">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque at magna ut ante eleifend eleifend.
                    </p>
                  </div>
                </div>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5">
                  <Image
                    src={authorImage}
                    alt="User Image"
                    width={50}
                    height={50}
                    className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0"
                  />
                  <div>
                    <h4 className="font-normal text-M-heading-color mb-2">
                      Jhone Doe{" "}
                      <span className="text-M-text-color">
                        Feb 9, 2023 at 10:23
                      </span>{" "}
                      <span>
                        <Link href={"#comments"}>- Reply</Link>
                      </span>
                    </h4>
                    <p className="text-M-text-color font-jost">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque at magna ut ante eleifend eleifend.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Comments area */}
              <div
                className="border border-M-text-color/50 p-6 rounded-lg mt-10"
                id="comments"
              >
                <h2 className="text-3xl">Leave a Reply</h2>
                <p className="font-jost text-sm text-M-text-color">
                  Your email address will not be published. Required fields are
                  marked <span className="text-M-secondary-color">*</span>
                </p>

                <form action="#" className="mt-4">
                  {/* Comments */}
                  <div>
                    <label
                      htmlFor="commnet"
                      className="text-black text-base font-jost mb-2 inline-block"
                    >
                      Comment <span className="text-M-secondary-color">*</span>
                    </label>
                    <textarea
                      name="comment"
                      id="commnet"
                      placeholder="Your Message"
                      rows={5}
                      className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none "
                      required
                    ></textarea>
                  </div>
                  {/* Name */}
                  <div className="mt-3">
                    <label
                      htmlFor="name"
                      className="text-black text-base font-jost mb-2 inline-block"
                    >
                      Name <span className="text-M-secondary-color">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none  "
                    />
                  </div>
                  {/* Email */}
                  <div className="mt-3">
                    <label
                      htmlFor="email"
                      className="text-black text-base font-jost mb-2 inline-block"
                    >
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none  "
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-M-heading-color font-jost font-medium text-white text-base uppercase py-3 px-6 rounded-md mt-6 inline-block hover:bg-M-primary-color transition-all duration-300"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <BlogSidebar 
              blogs={blogs}
              hideSearch={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
