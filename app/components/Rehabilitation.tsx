"use client";
import Link from "next/link";
import React from "react";
import Banner from "./Banner";
import { useI18n } from "../context/I18nContext";

const Rehabilitation = () => {
  const { t } = useI18n();

  return (
    <div className="bg-[#F9F7FE] md:mx-5 mt-4 rounded-[20px]">
      <Banner
        backgroundUrl="/assets/images/continueWatchingBanner.jpg"
        logoUrl="/assets/images/simpleLogo.svg"
        icon="/assets/icons/Rehabilitation.png"
        title=""
        description=""
      />
      <div className="px-4 md:px-10 pb-6 md:pb-10 pt-4 md:pt-6">
        <h2 className="text-[#3D334A] text-[32px] md:text-[64px] font-medium leading-[100%] tracking-[0%] mb-4 md:mb-6 font-bowler uppercase md:max-w-[1340px]" style={{ fontWeight: 500, color: '#3D334A' }}>
          {typeof t("rehabilitation.title") === "string" ? t("rehabilitation.title") : "Реабилитация"}
        </h2>
        <p className="text-[#846FA0] text-[16px] md:text-[24px] font-medium leading-[120%] tracking-[0%] mb-6 md:mb-8 font-pt md:max-w-[1340px]">
          {typeof t("rehabilitation.description") === "string" ? t("rehabilitation.description") : "Современные израильские методики реабилитации для восстановления и поддержания подвижности и трудоспособности"}
        </p>
        <Link
          className="text-[18px] md:text-[24px] leading-[90%] tracking-[0%] uppercase text-[#D4BAFC] hover:text-[#C4A6F1] transition-colors inline-block font-bowler"
          href={"/rehabilitation"}
        >
          {typeof t("rehabilitation.learn_more") === "string"
            ? t("rehabilitation.learn_more")
            : "Изучить"} →
        </Link>
        <hr className="mt-6 md:mt-10 border-[#D5D1DB]" />
      </div>
    </div>
  );
};

export default Rehabilitation;  