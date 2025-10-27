"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useI18n } from "../context/I18nContext";

interface SubscribeProps {
  backgroundImage?: string;
  titleKey?: string;
  buttonTextKey?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  containerStyles?: string;
  titleStyles?: string;
  buttonStyles?: string;
  subTitleKey?: string;
  bgColor?: string;
  // Fallback props for backward compatibility
  title?: string;
  buttonText?: string;
  subTitle?: string;
  bgCenter?: boolean;
}

const Subscribe = ({
  backgroundImage = "/assets/images/continueWatchingBanner.jpg",
  titleKey,
  buttonTextKey,
  buttonTextColor = "#3D334A",
  buttonBgColor = "#ffffff",
  containerStyles = "",
  titleStyles = "",
  buttonStyles = "",
  subTitleKey,
  bgColor = "",
  bgCenter = false,
  // Fallback props
  title = "Приобретите подписку для получения доступа к контенту платформы",
  buttonText = "Приобрести подписку",
  subTitle = "",
}: SubscribeProps) => {
  const { t } = useI18n();
  
  // Determine navigation path based on button text
  const getNavigationPath = () => {
    const text = buttonTextKey ? t(buttonTextKey) : buttonText;
    
    if (text?.toLowerCase().includes('subscription') || text?.toLowerCase().includes('подписка')) {
      return '/shoppingcard';
    } else if (text?.toLowerCase().includes('test') || text?.toLowerCase().includes('тест')) {
      return '/chapter';
    } else if (text?.toLowerCase().includes('survey') || text?.toLowerCase().includes('опрос')) {
      return '/contact';
    }
    return '#';
  };
  
  const navigationPath = getNavigationPath();
  return (
    <div className={`mb-6 md:mb-10 mt-10 md:mt-0 md:px-5 ${containerStyles}`}>
      <div
        className={` w-[359px] md:w-full md:h-[424px] ${bgCenter && "bg-center"
          } rounded-[20px] md:px-5 mx-auto md:mx-0 p-4 gap-5`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: bgColor,
        }}
      >
        <div>
          <h1
            className={`mb-5 text-[#3D334A] text-[20px] md:text-[64px] md:max-w-[1308px] md:pr-[52px] tracking-[-3%] md:pt-[48px] leading-[100%] ${titleStyles}`}
          >
            {titleKey && typeof t(titleKey) === "string" ? t(titleKey) : title}
          </h1>
          <p className="text-[#3D334A]">
            {subTitleKey && typeof t(subTitleKey) === "string"
              ? t(subTitleKey)
              : subTitle}
          </p>
        </div>
        <Link
          href={navigationPath}
          className={`flex items-center cursor-pointer md:mt-[70px] mt-10 rounded-[10px] gap-5 px-[15px] w-[327px] md:w-[562px]`}
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
          }}
        >
          <button
            className={`w-full py-[13px] text-[32px]  md:w-[562px] font-medium hover:opacity-80 ${buttonStyles}`}
          >
            {buttonTextKey ? t(buttonTextKey) : buttonText}
          </button>

          <Image
            src="/assets/images/rightArrow.svg"
            alt="rightArrow"
            width={42}
            height={15}
          />
        </Link>
      </div>
    </div>
  );
};

export default Subscribe;
