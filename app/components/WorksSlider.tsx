/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import SliderArrows from "./SliderArrows";
import Link from "next/link";
import { useI18n, useLanguage } from "../context/I18nContext";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  exerciseCount: number;
  categoryName: string;
  monthlyPrice: number;
  subcategoryId?: string;
  categoryId: string;
}

interface WorksSliderProps {
  title?: string;
  works: WorkItem[];
  linkType?: "sets" | "complex" | "section";
  categoryData?: any;
  fromMain: boolean;
  seeAll: boolean;
  scrollable: boolean;
  sliderId?: string;
  seeAllHref?: string;
  showTopLink?: boolean; // Control top "View all" link visibility
}

const WorksSlider: React.FC<WorksSliderProps> = ({
  title,
  works,
  linkType = "sets",
  fromMain,
  seeAll = true,
  scrollable = true,
  sliderId,
  seeAllHref = "/allComplex",
  showTopLink = true, // Default to true for backward compatibility
}) => {
  const { t } = useI18n();
  const { language } = useLanguage();

  const uniqueSliderId = sliderId || `works-slider-${Math.random().toString(36).substr(2, 9)}`;

  const scroll = (direction: "left" | "right") => {
    const slider = document.getElementById(uniqueSliderId);
    if (slider) {
      const scrollAmount = direction === "left" ? -500 : 500;
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      console.error(`❌ Slider element not found with ID: ${uniqueSliderId}`);
    }
  };

  return (
    <div className="px-10 py-[50px] rounded-[30px] bg-[#F9F7FE] mx-6 md:mb-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-5">
          <h2 className="text-[48px] md:text-[64px] text-[#3D334A] leading-[100%] tracking-[-1%] font-bold font-[Bowler] uppercase">
            {title}
          </h2>
          {seeAll && showTopLink && (
            <Link href={seeAllHref} className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="font-pt text-[#D4BAFC] text-[24px] leading-[90%] uppercase">
                {t("buttons.show_all") || "Смотреть все"}
              </span>
            </Link>
          )}
        </div>
        {scrollable && (
          <SliderArrows
            onScrollLeft={() => scroll("left")}
            onScrollRight={() => scroll("right")}
          />
        )}
      </div>

      <div
        id={uniqueSliderId}
        className="flex flex-row items-center gap-7 overflow-x-auto scrollbar-hide mt-12 scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex gap-4">
          {works.map((work) => (
            <Link
              key={work.id}
              href={
                fromMain
                  ? `/complex/${work.id}?categoryId=${work.categoryId}`
                  : linkType === "complex"
                  ? `/complex/${work.id}`
                  : linkType === "section"
                  ? `/categories/section?categoryId=${
                      work.categoryId || ""
                    }&subcategoryId=${work.subcategoryId || ""}`
                  : `/sets/${work.id}`
              }
              className="bg-white relative w-[400px] h-[493px] flex-shrink-0 rounded-[20px] hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex-grow">
                <Image
                  src={work.image}
                  width={319}
                  height={250}
                  alt={work.title}
                  className="w-full h-[250px] object-cover rounded-2xl mb-6"
                />
                <div className="mb-2.5 mx-4">
                  <span className="px-3 py-2 bg-[#E9DFF6] inline-block rounded-[6px] text-[#3D334A] text-[11px] font-bold leading-[110%] uppercase max-w-full font-[Bowler] break-words">
                    {work.categoryName}
                  </span>
                </div>
                <h3
                  className="text-[#3D334A] font-[1000] text-[18px] leading-[120%] mx-4 line-clamp-2 overflow-hidden font-[Bowler]"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {work.title}
                </h3>
                <p
                  className="line-clamp-3 text-[#846FA0] leading-[120%] text-sm mx-4 overflow-hidden font-[Bowler]"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {work.description}
                </p>
              </div>
              <div className="flex items-center justify-end absolute -bottom-2 right-0">
                <span className="px-5 py-3 bg-[#D4BAFC] rounded-lg text-white text-[18px] leading-[100%] font-bold mb-8 mr-8 mt-6 font-[Bowler]">
                  {work.monthlyPrice}
                  {language === "ka" ? "₾" : language === "ru" ? "₽" : "$"}/
                  {t("common.month")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default WorksSlider;