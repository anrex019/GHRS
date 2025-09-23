"use client";

import Header, { defaultMenuItems } from "../components/Header/Header";
import Link from "next/link";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { Footer } from "../components/Footer";
import SubHeader from "../components/Header/SubHeader";
import { useBlogs, useFeaturedBlogs, usePopularBlogs } from "../hooks/useBlogs";
import { useI18n } from "../context/I18nContext";
import { Blog } from "../api/blogs";

interface BlogCardProps {
  blog?: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { t, locale } = useI18n();

  if (!blog) {
    return (
      <div className="bg-white rounded-[20px] p-5 flex flex-col justify-between h-full shadow-sm animate-pulse">
        <div className="flex flex-col gap-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  const getLocalizedText = (field: { en: string; ru: string; ka?: string }) => {
    return field[locale as keyof typeof field] || field.ru || field.en || "";
  };

  return (
    <div className="bg-white rounded-[20px] p-5 flex flex-col justify-between h-full shadow-sm">
      <div className="flex flex-col gap-3">
        <h3 className="text-[#1A1A1A] text-xl font-semibold leading-tight">
          {getLocalizedText(blog.title)}
        </h3>
        <p className="text-[#1A1A1A]/70 text-sm line-clamp-3">
          {getLocalizedText(blog.excerpt)}
        </p>
      </div>

      <div className="flex justify-between">
        <div className="items-center flex">
          <span className="bg-[#F1EBF9] text-[#6941C6] text-sm font-medium py-3 px-5 rounded-xl w-fit">
            {blog.tags?.[0] || t("blog.category")}
          </span>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.593 3.322C18.693 3.45 19.5 4.399 19.5 5.507V21L12 17.25L4.5 21V5.507C4.5 4.399 5.306 3.45 6.407 3.322C10.123 2.89 13.877 2.89 17.593 3.322Z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

interface BigBlogCardProps {
  blog?: Blog;
}

const BigBlogCard = ({ blog }: BigBlogCardProps) => {
  const { t, locale } = useI18n();

  if (!blog) {
    return (
      <div className="rounded-[20px] h-full md:h-[500px] p-8 flex flex-col justify-between relative overflow-hidden bg-white shadow-sm animate-pulse">
        <div className="absolute top-0 left-0 w-full h-[45%] overflow-hidden bg-gray-200"></div>
        <div className="flex flex-col gap-4 mt-auto relative z-10">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  const getLocalizedText = (field: { en: string; ru: string; ka?: string }) => {
    return field[locale as keyof typeof field] || field.ru || field.en || "";
  };

  return (
    <div className="rounded-[20px] h-full md:h-[500px] p-8 flex flex-col justify-between relative overflow-hidden bg-white shadow-sm">
      {/* Add image div that takes up the top space */}
      <div className="absolute top-0 left-0 w-full h-[45%] overflow-hidden">
        <img
          src={blog.imageUrl || "/assets/images/blogbg.jpg"}
          alt={getLocalizedText(blog.title)}
          className="w-full h-full object-cover opacity-80"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#6941C6]" /> */}
      </div>

      {/* Existing buttons */}
      <div className="absolute top-8 right-8 flex flex-col gap-4 z-10">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.593 3.322C18.693 3.45 19.5 4.399 19.5 5.507V21L12 17.25L4.5 21V5.507C4.5 4.399 5.306 3.45 6.407 3.322C10.123 2.89 13.877 2.89 17.593 3.322Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Existing text content */}
      <div className="flex flex-col gap-4 mt-auto relative z-10">
        <h2 className="text-[#1A1A1A] text-lg md:text-xl font-semibold leading-tight">
          {getLocalizedText(blog.title)}
        </h2>
        <p className="text-[#1A1A1A]/80 text-sm">
          {getLocalizedText(blog.excerpt)}
        </p>
        <span className="bg-[#F1EBF9] text-[#6941C6] text-sm font-medium py-2 px-4 rounded-lg w-fit">
          {blog.tags?.[0] || t("blog.category")}
        </span>
      </div>
    </div>
  );
};

interface BlogHeaderProps {
  BlogCategory: string;
}

const BlogHeader = ({ BlogCategory }: BlogHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className="bg-[#F9F7FE] md:mx-5 md:px-10 px-4 md:pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] mt-5 md:text-[40px] pt-10 text-[#3D334A] md:mb-5">
          {BlogCategory}
        </h1>
        <div className="md:mt-16"></div>
      </div>

      <Link
        href="/categories"
        className="text-[14px] md:text-[24px] uppercase text-[#D4BAFC] hover:text-[#734ea4] transition-colors duration-300"
      >
        {t("blog.view_all")}
      </Link>
    </div>
  );
};

const BlogRoute = () => {
  const { t } = useI18n();
  const { blogs: allBlogs, loading: loadingAll } = useBlogs({ isPublished: true, limit: 8 });
  const { blogs: featuredBlogs, loading: loadingFeatured } = useFeaturedBlogs();
  const { blogs: popularBlogs, loading: loadingPopular } = usePopularBlogs(6);

  return (
    <div className="bg-[#F9F7FE]">
      <DesktopNavbar
        menuItems={defaultMenuItems}
        blogBg={true}
        allCourseBg={false}
      />
      <MobileNavbar />
      {/* <Header variant="blog" /> */}
      <SubHeader />

      {/* Featured Blogs Section */}
      <BlogHeader BlogCategory={t("blog.featured_articles")} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-12 px-10">
        <div className="col-span-2">
          <BigBlogCard blog={featuredBlogs[0]} />
        </div>

        <div className="col-span-2 gap-6 grid grid-cols-1 md:grid-cols-2 h-[500px]">
          <BlogCard blog={allBlogs[0]} />
          <BlogCard blog={allBlogs[1]} />
          <BlogCard blog={allBlogs[2]} />
          <BlogCard blog={allBlogs[3]} />
        </div>
      </div>

      {/* Popular Articles Section */}
      <BlogHeader BlogCategory={t("blog.popular_articles")} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-12 px-10">
        <BigBlogCard blog={popularBlogs[0]} />
        <BigBlogCard blog={popularBlogs[1]} />
        <div className="col-span-2 gap-6 grid  grid-cols-1 md:grid-cols-2 h-[500px]">
          <div className="col-span-2">
            <BlogCard blog={popularBlogs[2]} />
          </div>
          <BlogCard blog={popularBlogs[3]} />
          <BlogCard blog={popularBlogs[4]} />
        </div>
      </div>

      {/* Recent Articles Section */}
      <BlogHeader BlogCategory={t("blog.recent_articles")} />
      <div className="grid grid-cols-2 md:grid-cols-4  gap-6 w-full mb-12 px-10">
        <div className="col-span-2">
          <BigBlogCard blog={allBlogs[4]} />
        </div>

        <div className="col-span-2 gap-6 grid grid-cols-1 md:grid-cols-2 h-[500px]">
          <BlogCard blog={allBlogs[5]} />
          <BlogCard blog={allBlogs[6]} />
          <BlogCard blog={allBlogs[7]} />
          <BlogCard blog={featuredBlogs[1]} />
        </div>
      </div>

      {/* All Articles Section */}
      <BlogHeader BlogCategory={t("blog.all_articles")} />
      <div className="grid grid-cols-2 md:grid-cols-4  gap-6 w-full mb-12 px-10">
        <div className="col-span-2 gap-6 grid  grid-cols-1 md:grid-cols-2 h-[500px]">
          <div className="col-span-2">
            <BlogCard blog={featuredBlogs[2]} />
          </div>
          <BlogCard blog={popularBlogs[5]} />
          <BlogCard blog={allBlogs[0]} />
        </div>
        <div className="col-span-2 gap-6 grid grid-cols-1 md:grid-cols-2 h-[500px]">
          <BlogCard blog={allBlogs[1]} />
          <div className="row-span-2">
            <BigBlogCard blog={featuredBlogs[3]} />
          </div>
          <BlogCard blog={allBlogs[2]} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogRoute;
