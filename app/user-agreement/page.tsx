"use client";
import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header/Header";
import { Footer } from "../components/Footer";
import { useI18n } from "../context/I18nContext";

const UserAgreement = () => {
  const { t } = useI18n();

  return (
    <>
      <div className="bg-[#F9F7FE] min-h-screen">
        <DesktopNavbar
          menuItems={defaultMenuItems}
          blogBg={false}
          allCourseBg={false}
        />
        <MobileNavbar />
        
        <div className="max-w-5xl mx-auto px-4 md:px-10 py-10 md:py-16">
          <div className="bg-white rounded-[20px] p-6 md:p-12 shadow-sm">
            <h1 className="text-[#3D334A] text-[32px] md:text-[48px] font-bold leading-[120%] tracking-[-2px] mb-8 font-[Bowler]">
              {t("userAgreement.title")}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-[#3D334A] text-[16px] md:text-[18px] leading-[160%] whitespace-pre-wrap font-pt">
                {t("userAgreement.content")}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default UserAgreement;
