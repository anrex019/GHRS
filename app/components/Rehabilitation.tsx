"use client";
import Link from "next/link";
import React from "react";
import Banner from "./Banner";
import { useI18n } from "../context/I18nContext";

const Rehabilitation = () => {
  const { t } = useI18n();

  return (
    <div className="bg-[#F9F7FE] md:mx-5 mt-4">
      <Banner
        backgroundUrl="/assets/images/continueWatchingBanner.jpg"
        logoUrl="/assets/images/simpleLogo.svg"
        icon="/assets/icons/Rehabilitation.png"
        title={typeof t("rehabilitation.title") === "string" ? t("rehabilitation.title") : "Rehabilitation"}
        description={typeof t("rehabilitation.description") === "string" ? t("rehabilitation.description") : ""}
      />
      <div className="md:p-10 px-4">
        <Link
          className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC] hover:text-[#C4A6F1] transition-colors inline-block font-[Bowler]"
          href={"/rehabilitation"}
        >
          {typeof t("rehabilitation.learn_more") === "string"
            ? t("rehabilitation.learn_more")
            : "Изучить подробнее"}
        </Link>
        <hr className="md:mt-10 mt-5 bg-[#D5D1DB] text-[#D5D1DB]" />
      </div>
    </div>
  );
};

export default Rehabilitation;  