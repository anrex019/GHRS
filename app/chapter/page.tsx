"use client";
import React from "react";
import MainHeader from "../components/Header/MainHeader";
import WorksSlider from "../components/WorksSlider";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import Blog from "../components/Blog";
import { FaBook, FaDumbbell, FaClock } from "react-icons/fa";
import { useI18n } from "../context/I18nContext";
import useStatistics from "../hooks/useStatistics";

export const chapterSliderInfo = [
  {
    id: "1",
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
    exerciseCount: 10,
    categoryName: "Ортопедия",
    monthlyPrice: 920,
    categoryId: "orthopedics-1",
  },
  {
    id: "2",
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
    exerciseCount: 10,
    categoryName: "Ортопедия",
    monthlyPrice: 920,
    categoryId: "orthopedics-2",
  },
  {
    id: "3",
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
    exerciseCount: 10,
    categoryName: "Ортопедия",
    monthlyPrice: 920,
    categoryId: "orthopedics-3",
  },
  {
    id: "4",
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
    exerciseCount: 10,
    categoryName: "Ортопедия",
    monthlyPrice: 920,
    categoryId: "orthopedics-4",
  },
];

const Chapter = () => {
  const { t } = useI18n();
  const { statistics } = useStatistics();

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

  return (
    <div>
      <MainHeader
        ShowBlock={true}
        OptionalComponent={null}
        stats={statsData as never[]}
        showArrows={true}
      />
      <div className="mt-4 px-6">
        <WorksSlider 
          title="Популярные упражнения" 
          works={chapterSliderInfo} 
          fromMain={false} 
          seeAll={false} 
          scrollable={false} 
        />
      </div>
      <div className="mt-10 px-6">
        <WorksSlider
          title="Шейный отдел позвоночника"
          works={chapterSliderInfo}
          fromMain={false} 
          seeAll={false} 
          scrollable={false}
        />
      </div>
      <Subscribe />
      <ReviewSlider title="" />
      <Blog
        withBanner={false}
        withSlider={true}
        layoutType="default"
        title={""}
      />
    </div>
  );
};

export default Chapter; 