import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

import bannerImage from "@/assets/images/singleBlogBannerImage.jpg";
import authorImage from "@/assets/images/client2.png";
import singleBlogImage from "@/assets/images/singleBlogImage1.jpg";

import BlogSidebar from "@/app/Component/Shared/BlogSidebar/BlogSidebar";

const singleBlog = () => {
  return (
    <div>
      {/* Hero Area */}
      <div className="pt-[80px] lg:pt-[100px] pb-20 md:pb-32 lg:pb-[120px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="rounded-2xl">
            <Image
              src={bannerImage}
              alt="blog Feature Image"
              width="100%"
              height="100%"
              className="rounded-2xl"
            />
          </div>
          <div className="col-span-2 space-y-4">
            <span className="px-4 py-2 bg-M-heading-color text-sm md:text-base text-white font-jost font-medium uppercase inline-block rounded-md">
              Pulmonologist
            </span>
            <h1 className="text-2xl md:text-4xl text-white">
              Having overweight and depression can Pulmonologist.
            </h1>
            <p className="text-base text-white/80 font-jost">
              In the tennis world, a number of players whose names have come to
              symbolize excellence have grown very legendary. From deciding
              Grand Slam tournaments to shattering new records and transforming
              the game, these people have irrevocably changed tennis history.
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
                <Icon icon="oui:token-date" width="30" height="30" /> March 10,
                2024
              </li>
              <li className="flex items-center gap-2 font-jost font-medium text-white capitalize">
                <Icon icon="lucide:alarm-clock" width="24" height="24" /> 12:30
                PM
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
              <h3 className="text-xl text-M-heading-color mb-3">
                Comprehensive Eye Exams
              </h3>
              <p className="text-base text-M-text-color font-jost mb-3">
                In the tennis world, a number of players whose names have come
                to symbolize excellence have grown very legendary. From deciding
                Grand Slam tournaments to shattering new records and
                transforming the game, these people have irrevocably changed
                tennis history. Here we will more closely review some of the
                best tennis players of all times. We will look at their playing
                techniques, career highlights, and impact on the game generally.
                This book will help you to appreciate the icons who have shaped
                tennis into what it is now, regardless of your level of passion
                for the game or just the beginning.
              </p>
              <h3 className="text-xl text-M-heading-color mb-3">
                Types of Govt. Sites for Link-Building
              </h3>
              <p className="text-base text-M-text-color font-jost mb-3">
                In the tennis world, a number of players whose names have come
                to symbolize excellence have grown very legendary. From deciding
                Grand Slam tournaments to shattering new records and
                transforming the game, these people have irrevocably changed
                tennis history. Here we will more closely review some of the
                best tennis players of all times. We will look at their playing
                techniques, career highlights, and impact on the game generally.
                This book will help you to appreciate the icons who have shaped
                tennis into what it is now, regardless of your level of passion
                for the game or just the beginning.
              </p>
              <h3 className="text-xl text-M-heading-color mb-3">
                Federal Government Sites
              </h3>
              <p className="text-base text-M-text-color font-jost mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit leo vel erat
                lacinia, scelerisque malesuada urna condimentum. Pellentesque
                tincidunt ut eros a interdum. Aenean nibh condimentum. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit{" "}
              </p>
              {/* List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 font-jost text-base text-M-text-color">
                  <span className="text-white w-8 h-8 bg-M-primary-color rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      icon="quill:checkmark-double"
                      width="20"
                      height="20"
                    />
                  </span>{" "}
                  <span className="mt-1">
                    <strong className="text-black">Color Customization:</strong>{" "}
                    Adjust the palette to fit your app's look directly within
                    After Effects.
                  </span>
                </li>
                <li className="flex items-start gap-3 font-jost text-base text-M-text-color">
                  <span className="text-white w-8 h-8 bg-M-primary-color rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      icon="quill:checkmark-double"
                      width="20"
                      height="20"
                    />
                  </span>{" "}
                  <span className="mt-1">
                    <strong className="text-black">Drag-and-Drop:</strong>{" "}
                     Simple drag-and-drop functionality for your app screenshots
                  </span>
                </li>
                <li className="flex items-start gap-3 font-jost text-base text-M-text-color">
                  <span className="text-white w-8 h-8 bg-M-primary-color rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      icon="quill:checkmark-double"
                      width="20"
                      height="20"
                    />
                  </span>{" "}
                  <span className="mt-1">
                    <strong className="text-black">Color Customization:</strong>{" "}
                    Adjust the palette to fit your app's look directly within
                    After Effects.
                  </span>
                </li>
              </ul>

              <Image
                src={singleBlogImage}
                alt="blog Image"
                width="100%"
                height="100%"
                className="rounded-md w-full my-4"
              />
              <h3 className="text-xl text-M-heading-color mb-3">
                Federal Government Sites
              </h3>
              <p className="text-base text-M-text-color font-jost mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit leo vel erat
                lacinia, scelerisque malesuada urna condimentum. Pellentesque
                tincidunt ut eros a interdum. Aenean nibh condimentum. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit{" "}
              </p>

              {/* Blockquote */}
              <div className="bg-M-primary-color/60 rounded-xl px-10 py-10 my-6">
                <p className="relative indent-12 font-jost text-lg text-white">
                  <Icon
                    icon="gravity-ui:quote-open"
                    width="42"
                    height="42"
                    className="inline absolute text-white -top-2 left-0"
                  />
                  Curious to see the magic for yourself? Dive into the world of
                  Kirmada. Check out the Kirmada Lifetime Deal and start your
                  journey towards productivity! Curious to see the magic for
                  yourself?
                </p>
              </div>

              <h3 className="text-xl text-M-heading-color mb-3">
                Federal Government Sites
              </h3>
              <p className="text-base text-M-text-color font-jost mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit leo vel erat
                lacinia, scelerisque malesuada urna condimentum. Pellentesque
                tincidunt ut eros a interdum. Aenean nibh condimentum. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit{" "}
              </p>

              {/* List */}
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-3 font-jost text-base text-M-text-color">
                  <span className="text-white w-8 h-8 bg-M-primary-color rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      icon="quill:checkmark-double"
                      width="20"
                      height="20"
                    />
                  </span>{" "}
                  <span className="mt-1">
                    <strong className="text-black">Color Customization:</strong>{" "}
                    Adjust the palette to fit your app's look directly within
                    After Effects.
                  </span>
                </li>
                <li className="flex items-start gap-3 font-jost text-base text-M-text-color">
                  <span className="text-white w-8 h-8 bg-M-primary-color rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      icon="quill:checkmark-double"
                      width="20"
                      height="20"
                    />
                  </span>{" "}
                  <span className="mt-1">
                    <strong className="text-black">Drag-and-Drop:</strong>{" "}
                     Simple drag-and-drop functionality for your app screenshots
                  </span>
                </li>
                <li className="flex items-start gap-3 font-jost text-base text-M-text-color">
                  <span className="text-white w-8 h-8 bg-M-primary-color rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      icon="quill:checkmark-double"
                      width="20"
                      height="20"
                    />
                  </span>{" "}
                  <span className="mt-1">
                    <strong className="text-black">Color Customization:</strong>{" "}
                    Adjust the palette to fit your app's look directly within
                    After Effects.
                  </span>
                </li>
              </ul>

              <Image
                src={singleBlogImage}
                alt="blog Image"
                width="100%"
                height="100%"
                className="rounded-md w-full my-4"
              />

              <h3 className="text-xl text-M-heading-color mb-3">
                Federal Government Sites
              </h3>
              <p className="text-base text-M-text-color font-jost mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit leo vel erat
                lacinia, scelerisque malesuada urna condimentum. Pellentesque
                tincidunt ut eros a interdum. Aenean nibh condimentum. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                facilisis enim sit amet placerat vestibulum. Sed ut arcu quis
                nunc pellentesque dapibus a tristique tortor. Ut vulputate erat
                sit amet placerat consectetur. Donec suscipit{" "}
              </p>

              {/* Show Commnets Area */}
              <div className="border border-M-text-color/50 p-6 rounded-lg mt-10" >
                <h2 className="text-2xl md:text-3xl">02 Comments</h2>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5">
                    <Image src={authorImage} alt="User Image" width={50} height={50} className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0" />
                    <div>
                        <h4 className="font-normal text-M-heading-color mb-2">Jhone Doe <span className="text-M-text-color">Feb 9, 2023 at 10:23</span>  <span><Link href={'#comments'}>- Reply</Link></span></h4>
                        <p className="text-M-text-color font-jost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.</p>
                    </div>
                </div>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5 ml-10">
                    <Image src={authorImage} alt="User Image" width={50} height={50} className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0" />
                    <div>
                        <h4 className="font-normal text-M-heading-color mb-2">Jhone Doe <span className="text-M-text-color">Feb 9, 2023 at 10:23</span>  <span><Link href={'#comments'}>- Reply</Link></span></h4>
                        <p className="text-M-text-color font-jost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.</p>
                    </div>
                </div>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5">
                    <Image src={authorImage} alt="User Image" width={50} height={50} className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0" />
                    <div>
                        <h4 className="font-normal text-M-heading-color mb-2">Jhone Doe <span className="text-M-text-color">Feb 9, 2023 at 10:23</span>  <span><Link href={'#comments'}>- Reply</Link></span></h4>
                        <p className="text-M-text-color font-jost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.</p>
                    </div>
                </div>
                <div className="block md:flex items-start gap-4 mt-4 border-t border-M-text-color/20 pt-5">
                    <Image src={authorImage} alt="User Image" width={50} height={50} className="shrink-0 rounded-full border-2 border-M-primary-color/50 mb-2 md:mb-0" />
                    <div>
                        <h4 className="font-normal text-M-heading-color mb-2">Jhone Doe <span className="text-M-text-color">Feb 9, 2023 at 10:23</span>  <span><Link href={'#comments'}>- Reply</Link></span></h4>
                        <p className="text-M-text-color font-jost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.</p>
                    </div>
                </div>
              </div>

                {/* Submit Comments area */}
                <div className="border border-M-text-color/50 p-6 rounded-lg mt-10" id="comments">
                    <h2 className="text-3xl">Leave a Reply</h2>
                    <p className="font-jost text-sm text-M-text-color">Your email address will not be published. Required fields are marked <span className="text-M-secondary-color">*</span></p>

                    <form action="#" className="mt-4">
                        {/* Comments */}
                        <div>
                            <label htmlFor="commnet" className="text-black text-base font-jost mb-2 inline-block">Comment <span className="text-M-secondary-color">*</span></label>
                            <textarea name="comment" id="commnet" placeholder="Your Message" rows={5} className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none " required></textarea>
                        </div>
                        {/* Name */}
                        <div className="mt-3">
                            <label htmlFor="name" className="text-black text-base font-jost mb-2 inline-block">Name <span className="text-M-secondary-color">*</span></label>
                            <input type="text" placeholder="Your Name" required className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none  " />
                        </div>
                        {/* Email */}
                        <div className="mt-3">
                            <label htmlFor="email" className="text-black text-base font-jost mb-2 inline-block">Email </label>
                            <input type="email" placeholder="Your Email" className="p-3 w-full bg-M-section-bg border-M-primary-color/20 rounded-md focus:ring-M-primary-color focus:ring ring-0 outline-none  " />
                        </div>
                        <button type="submit" className="bg-M-heading-color font-jost font-medium text-white text-base uppercase py-3 px-6 rounded-md mt-6 inline-block hover:bg-M-primary-color transition-all duration-300">Post Comment</button>
                    </form>
                </div>

            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleBlog;
