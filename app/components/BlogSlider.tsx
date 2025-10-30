// BlogSlider.tsx
"use client";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "../context/I18nContext";

interface Blog {
  _id: string;
  title: {
    en: string;
    ru: string;
    ka?: string;
  };
  description: {
    en: string;
    ru: string;
    ka?: string;
  };
  excerpt: {
    en: string;
    ru: string;
    ka?: string;
  };
  imageUrl: string;
  categoryId: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: Date;
  viewsCount: number;
  likesCount: number;
  isActive: boolean;
  sortOrder: number;
  featuredImages?: string[];
  articles?: unknown[];
}

interface BlogSliderProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  currentPage: number;
  blogsPerPage: number;
  blogs: Blog[];
  language: "ka" | "en" | "ru";
  showHeader?: boolean;
}

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
};

const BlogSlider: React.FC<BlogSliderProps> = ({
  scrollRef,
  currentPage,
  blogsPerPage,
  blogs,
  language,
  showHeader = true,
}) => {
  const isDesktop = useIsDesktop();
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);
  const { t } = useI18n();

  const getLocalizedText = (field: { en: string; ru: string; ka?: string } | undefined): string => {
    if (!field) return "";
    return field[language] || field.ru || field.en || "";
  };

  const getCurrentBlogs = () => {
    const startIndex = currentPage * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return otherBlogs.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(otherBlogs.length / blogsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef?.current) return;

      const { scrollLeft, clientWidth } = scrollRef.current;
      const currentPageFromScroll = Math.round(scrollLeft / clientWidth);

      if (currentPageFromScroll !== currentPage) {
        const newPage = Math.min(Math.max(0, currentPageFromScroll), totalPages - 1);
        if (newPage !== currentPage) {
        }
      }
    };

    const scrollContainer = scrollRef?.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage, totalPages, scrollRef]);

  const getBlogLink = (blog: Blog) => {
    if (!blog || !blog._id) {
      return "#";
    }
    return `/article/${blog._id}`;
  };

  return (
    <div className="w-full" data-show-header={String(showHeader)}>
      <div className="flex md:flex-row flex-col gap-5 mb-10 w-full px-0">
        {/* Featured Blog */}
        {featuredBlog && isDesktop && (
          <Link href={getBlogLink(featuredBlog)} className="flex-1">
            <div className="bg-white p-5 hover:shadow-lg duration-300 transition-shadow h-[518px] rounded-[20px] flex flex-col justify-between">
              <div className="relative w-full">
                <Image
                  src={
                    featuredBlog.featuredImages?.[0] ||
                    featuredBlog.imageUrl ||
                    ""
                  }
                  width={694}
                  height={232}
                  alt={getLocalizedText(featuredBlog.title)}
                  className="w-full h-[232px] object-cover rounded-[20px]"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                  <div className="w-10 h-10 bg-[#F9F7FE]/30 backdrop-blur-sm rounded-[6px] flex justify-center items-center hover:bg-[#F9F7FE]/50 transition-all">
                    <CiBookmark className="w-[14.2px] h-[18.68px] text-white" />
                  </div>
                  <div className="w-10 h-10 bg-[#F9F7FE]/30 backdrop-blur-sm rounded-[6px] flex justify-center items-center hover:bg-[#F9F7FE]/50 transition-all">
                    <IoIosShareAlt className="w-[14.2px] h-[18.68px] text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between mt-4">
                <div>
                  <h3 className="text-[#3D334A] text-[24px] leading-[120%] font-semibold mb-2 font-[Bowler]">
                    <div className="line-clamp-2">
                      {getLocalizedText(featuredBlog.title)?.trim()}
                    </div>
                  </h3>
                  <p className="text-[#846FA0] font-medium leading-[120%] line-clamp-2 font-[Bowler]">
                    {getLocalizedText(featuredBlog.excerpt) || getLocalizedText(featuredBlog.description) || ""}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Desktop Grid */}
        {isDesktop ? (
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-5 h-full">
              {getCurrentBlogs().map((blog) => (
                <Link key={blog._id} href={getBlogLink(blog)}>
                  <div className="h-[249px] p-5 bg-white flex flex-col justify-between rounded-[20px] hover:shadow-lg duration-300 transition-shadow">
                    <h3 className="text-[#3D334A] text-[24px] leading-[120%] line-clamp-3 font-bold font-[Bowler]">
                      {getLocalizedText(blog.title)}
                    </h3>
                    <div className="flex justify-end items-center gap-1.5">
                      <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center hover:bg-[#E9DFF6] transition-all">
                        <CiBookmark className="w-[14.2px] h-[18.68px] text-black" />
                      </div>
                      <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center hover:bg-[#E9DFF6] transition-all">
                        <IoIosShareAlt className="w-[14.2px] h-[18.68px] text-black" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-auto gap-5 flex-row overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {getCurrentBlogs().map((blog) => (
              <Link key={blog._id} href={getBlogLink(blog)}>
                <div className="w-[200px] flex-shrink-0 p-3 bg-white flex flex-col justify-between rounded-[10px]">
                  <Image
                    src={blog.featuredImages?.[0] || blog.imageUrl || ""}
                    width={189}
                    height={172}
                    alt={getLocalizedText(blog.title)}
                    className="rounded-[10px]"
                  />
                  <p className="text-[#3D334A] text-[14px] leading-[120%] mt-2 line-clamp-2 font-[Bowler]">
                    {getLocalizedText(blog.title)}
                  </p>
                  <div className="flex justify-end items-center gap-1.5 mt-2">
                    <div className="w-8 h-8 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                      <CiBookmark className="text-black" />
                    </div>
                    <div className="w-8 h-8 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                      <IoIosShareAlt className="text-black" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link
        href="/blog"
        className="text-[#D4BAFC] leading-[90%] text-[15px] md:text-[24px] md:px-5 px-0 cursor-pointer hover:text-[#734ea4] transition-colors duration-300 font-[Bowler]"
      >
        {t("blog.see_all")} {blogs?.length} {t("navigation.rightArrow")}
      </Link>
    </div>
  );
};

export default BlogSlider;
