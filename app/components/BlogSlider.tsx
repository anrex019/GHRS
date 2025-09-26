// BlogSlider.tsx
"use client";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "../context/I18nContext";
import { useRouter } from "next/navigation";
// import { useCategories } from "../hooks/useCategories";

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
  articles?: any[]; // Keep this flexible for compatibility
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
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);
  const { t } = useI18n();

  // Helper function to get localized text with fallback
  const getLocalizedText = (field: { en: string; ru: string; ka?: string } | undefined): string => {
    if (!field) return "";
    return field[language] || field.ru || field.en || "";
  };

  const getCurrentBlogs = () => {
    const startIndex = currentPage * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return otherBlogs.slice(startIndex, endIndex);
  };

  // მთლიანი გვერდების რაოდენობა
  const totalPages = Math.ceil(otherBlogs.length / blogsPerPage);
  
  // სქროლის შემდეგ გადავამოწმოთ თუ საჭიროა გვერდის განახლება
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef?.current) return;
      
      const { scrollLeft, clientWidth } = scrollRef.current;
      const currentPageFromScroll = Math.round(scrollLeft / clientWidth);
      
      if (currentPageFromScroll !== currentPage) {
        // განვაახლოთ გვერდის ნომერი სქროლის პოზიციიდან
        const newPage = Math.min(Math.max(0, currentPageFromScroll), totalPages - 1);
        if (newPage !== currentPage) {
          // აქ არ ვიძახებთ setCurrentPage-ს რადგან ეს prop არის
        }
      }
    };

    const scrollContainer = scrollRef?.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage, totalPages]);

  // Helper function to get blog link
  const getBlogLink = (blog: Blog) => {
    if (!blog || !blog._id) {
      return "#";
    }

    // Link to the individual blog detail page
    return `/blog/${blog._id}`;
  };

  // const getArticleCount = (count: number) => {
  //   if (count === 1) {
  //     return t("blog.articles_count_one");
  //   }
  //   return t("blog.articles_count", { count: String(count) });
  // };

  return (
    <div className="w-full font-pt">
      <div className="flex md:flex-row flex-col gap-2.5 mb-10 w-full px-0">
        {/* Featured Blog */}
        {featuredBlog && isDesktop && (
          <Link href={getBlogLink(featuredBlog)}>
            <div className="bg-white md:p-2 md:pb-5 hover:shadow-lg duration-300 transition-shadow md:h-[518px] w-[280px] md:w-auto flex-shrink-0 rounded-[20px] flex-col justify-between snap-center">
              <div className="relative min-w-[300px] max-w-[690px] ">
                <Image
                  src={
                    featuredBlog.featuredImages?.[0] ||
                    featuredBlog.imageUrl ||
                    ""
                  }
                  width={694}
                  height={232}
                  alt={getLocalizedText(featuredBlog.title)}
                  className="md:h-[232px] object-cover rounded-[20px]"
                />
                <div className="text-[#3D334A] tracking-[0%] md:mt-[10px] mt-0 md:mb-2 mb-2 text-[14px] md:text-[24px] leading-[120%] font-semibold px-3">
                  <div className="line-clamp-2">
                    {getLocalizedText(featuredBlog.title)?.trim()}
                  </div>
                </div>
                <div className="mt-0 text-[#846FA0] font-medium leading-[120%] tracking-[0%] px-3">
                  <div className="line-clamp-2">
                    {getLocalizedText(featuredBlog.excerpt) || getLocalizedText(featuredBlog.description) || ""}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 font-[Bowler] mt-4">
                {/* <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                  {getArticleCount(featuredBlog.articles?.length || 0)}
                </span> */}
              </div>
            </div>
          </Link>
        )}

        {/* Desktop Grid */}
        {isDesktop ? (
          <div className="relative">
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
              {getCurrentBlogs().map((blog) => (
                <Link key={blog._id} href={getBlogLink(blog)}>
                  <div className="min-w-[200px] hover:shadow-lg duratio-300 transition-shadow max-w-full md:h-[249px] p-5 bg-white flex flex-col justify-between rounded-[20px]">
                    <p className="text-[#3D334A] text-[18px] leading-[120%] line-clamp-2 font-bold md:text-[24px]">
                      {getLocalizedText(blog.title)}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      {/* <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                        {getArticleCount(blog.articles?.length || 0)}
                      </span> */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                          <CiBookmark className="w-[14.2px] h-[18.68px] text-black" />
                        </div>
                        <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                          <IoIosShareAlt className="w-[14.2px] h-[18.68px] text-black" />
                        </div>
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
                    className="flex"
                  />
                  <p className="text-[#3D334A] text-[14px] leading-[120%] mt-2 line-clamp-2">
                    {getLocalizedText(blog.title)}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    {/* <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                      {getArticleCount(blog.articles?.length || 0)}
                    </span> */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                        <CiBookmark className="text-black" />
                      </div>
                      <div className="w-8 h-8 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                        <IoIosShareAlt className="text-black" />
                      </div>
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
        className="text-[#D4BAFC] leading-[90%] text-[15px] md:text-[24px] md:px-5 px-0 cursor-pointer hover:text-[#734ea4] transition-colors duration-300"
      >
        {t("blog.see_all")} {blogs?.length} {t("navigation.rightArrow")}
      </Link>
    </div>
  );
};

export default BlogSlider;
