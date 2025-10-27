/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Header from "./components/Header/Header";
import Rehabilitation from "./components/Rehabilitation";
import Category from "./components/Category";
import Works from "./components/Works";
import Subscribe from "./components/Subscribe";
import Professional from "./components/Professional";
import MarketPlace from "./components/MarketPlace";
import Blog from "./components/Blog";
import Download from "./components/Download";
import Reviews from "./components/Reviews";
import { useAllSets } from "./hooks/useSets";
import { Footer } from "./components/Footer";
import { useI18n } from "./context/I18nContext";
import MainHeader from "./components/Header/MainHeader";
import { FaBook, FaDumbbell, FaClock } from "react-icons/fa";
import useStatistics from "./hooks/useStatistics";

const Home = () => {
  const { sets } = useAllSets();
  const { t } = useI18n();
  const { statistics } = useStatistics();
  console.log(sets, 'სეტები სეტები სეტები სეტები');

  // Add stats data using real API data
  const statsData = [
    {
      icon: <FaBook size={24} />,
      value: statistics ? `${statistics.total.sets}` : "Loading...",
      label: t("header.sets_count", { count: String(statistics?.total.sets || 0) }).replace(/\d+\s*/, ""),
    },
    {
      icon: <FaDumbbell size={24} />,
      value: statistics ? `${statistics.total.exercises}` : "Loading...",
      label: t("header.exercises_count", { count: String(statistics?.total.exercises || 0) }).replace(/\d+\s*/, ""),
    },
    {
      icon: <FaClock size={24} />,
      value: statistics ? `${statistics.total.hours}` : "Loading...",
      label: t("header.hours_count", { count: String(statistics?.total.hours || 0) }).replace(/\d+\s*/, ""),
    },
  ];

  // ✅ ახლა ლოკალიზებულია!
  const CustomBlock = (
    <div className="md:absolute flex bottom-0  right-0 md:bg-white rounded-tl-4xl p-8 justify-center mt-16">
      <div className="text-white  bg-[#3D334A] p-6 rounded-2xl h-54 md:w-54 w-full items-center justify-center transition-transform duration-300 hover:scale-105">
        {t("header.learn_more")}
      </div>
      <div className="text-white bg-gradient-to-tr from-[#FFDAB9] via-[#C4A6F1] to-[#C4A6F1] p-6 rounded-2xl h-54 md:w-54 w-full items-center justify-center transition-transform duration-300 hover:scale-105 ml-4">
        {t("header.to_catalog")}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <MainHeader
        ShowBlock={true}
        OptionalComponent={null}
        stats={statsData as never[]} 
      />
      <div>
        <Rehabilitation />
        <Category bgColor="#F9F7FE" customRounded={""} customMx={""} />
        <hr className="border-[#D5D1DB] w-[95%] mx-auto my-8" />
        <Works
          title={t("navigation.sets")}
          sets={sets}
          fromMain={true}
          customMargin="20px"
          customBorderRadius=""
          seeAll={false}
          scrollable={true}
        />
        <Subscribe
          backgroundImage="/assets/images/categorySliderBgs/bg1.jpg"
          titleKey="subscription.title"
          buttonTextKey="buttons.subscribe"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          href="/shoppingcard"
          bgCenter={true}
          containerStyles="custom-class"
          titleStyles="text-white"
          buttonStyles="hover:opacity-80"
        />
        <Professional
          withBanner={true}
          title={t("sections.professional")}
          bgColor={"#F9F7FE"}
          withProfText={true}
        />
        <div className="mb-10">
          <Blog
            withBanner={true}
            withSlider={true}
            layoutType="default"
            title={t("navigation.blog")}
            showCategories={false}
          />
        </div>
        <MarketPlace />
        <Subscribe
          backgroundImage="/assets/images/categorySliderBgs/bg1.jpg"
          titleKey="subscription.test_title"
          buttonTextKey="buttons.take_test"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          bgCenter={true}
          containerStyles="custom-class"
          titleStyles="text-white"
          buttonStyles="hover:opacity-80"
        />
        <Download />
        <Reviews />
        <Subscribe
          backgroundImage=""
          titleKey="subscription.feedback_title"
          subTitleKey="subscription.feedback_subtitle"
          buttonTextKey="buttons.take_survey"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          href="/shoppingcard"
          containerStyles="custom-class"
          titleStyles="text-[#3D334A]"
          buttonStyles="hover:opacity-80"
          bgColor="#F9F7FE"
        />
        <Footer />
      </div>
    </div>
  );
};

export default Home;