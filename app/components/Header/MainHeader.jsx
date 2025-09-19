'use client'

import React from "react";
import DesktopNavbar from "../Navbar/DesktopNavbar";
import { useI18n } from "../../context/I18nContext";
import MobileNavbar from "../Navbar/MobileNavbar";

function MainHeader({
  ShowBlock = false,
  OptionalComponent = null,
  stats = [],
  onPrevious = null,
  onNext = null,
  showArrows = true,
}) {
  const { t } = useI18n();

  const localizedMenuItems = [
    { id: 1, name: t("navigation.all_complexes"), route: "allComplex" },
    { id: 2, name: t("navigation.about"), route: "about" },
    { id: 3, name: t("navigation.blog"), route: "blog" },
    { id: 4, name: t("navigation.contacts"), route: "contact" },
  ];

  return (
    <div className="relative rounded-[20px] h-[100vh] md:h-[80vh] md:m-6">
      <DesktopNavbar
        menuItems={localizedMenuItems}
        blogBg={false}
        allCourseBg={false}
      />
      <div>
        <MobileNavbar menuItems={localizedMenuItems} />
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-bg absolute h-full object-cover z-[-1] md:rounded-[20px]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Arrow Navigation Buttons */}
      {showArrows && (
        <div className="hidden absolute right-8 top-4/7 transform -translate-y-1/2 md:flex gap-3 z-10">
          <button
            onClick={onPrevious}
            className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-black/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!onPrevious}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-black/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!onNext}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="md:w-212 m-8 content-between md:grid ">
        <h1 className="text-2xl md:text-5xl font-bold text-white mb-6 hidden md:block">
          {/* {title} */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
          facere quidem necessitatibus sint illo ea.
        </h1>
        {/* Add stats container */}

        <div className="block md:absolute bottom-8">
          <div className="flex gap-4 flex-col md:flex-row mb-4 w-full justify-between">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#3d334a4d] w-full backdrop-blur-sm rounded-2xl p-3 flex items-center justify-center md: gap-2 transition-transform duration-300 hover:scale-105"
              >
                <span className="text-white/80">{stat.icon}</span>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/80">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#3d334a4d] rounded-3xl p-8 content-between grid max-w-212">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
              dignissimos.
            </h1>
            <p className="text-sm md:text-lg text-white">Description</p>
          </div>
        </div>

        {ShowBlock && OptionalComponent && (
          <div>
            {OptionalComponent}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainHeader;