"use client";
import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { getDefaultMenuItems } from "../components/Header/Header";
import { Footer } from "../components/Footer";
import { useI18n } from "../context/I18nContext";
import { useLegalDocument } from "../hooks/useLegalDocument";

const UserAgreement = () => {
  const { t, locale } = useI18n();
  const { document, loading, error } = useLegalDocument('user-agreement', locale);
  const menuItems = getDefaultMenuItems(t);

  return (
    <>
      <div className="bg-[#F9F7FE] min-h-screen">
        <DesktopNavbar
          menuItems={menuItems}
          blogBg={false}
          allCourseBg={false}
        />
        <MobileNavbar />
        
        <div className="max-w-5xl mx-auto px-4 md:px-10 py-10 md:py-16">
          <div className="bg-white rounded-[20px] p-6 md:p-12 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500 mb-4">{error}</p>
                <p className="text-gray-600">Fallback to static content:</p>
                <h1 className="text-[#3D334A] text-[32px] md:text-[48px] font-bold leading-[120%] tracking-[-2px] mb-8 font-bowler mt-4">
                  {t("userAgreement.title")}
                </h1>
                <div className="prose prose-lg max-w-none">
                  <div className="text-[#3D334A] text-[16px] md:text-[18px] leading-[160%] whitespace-pre-wrap font-pt">
                    {t("userAgreement.content")}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-[#3D334A] text-[32px] md:text-[48px] font-bold leading-[120%] tracking-[-2px] mb-8 font-bowler">
                  {document?.title || t("userAgreement.title")}
                </h1>
                
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-[#3D334A] text-[16px] md:text-[18px] leading-[160%] font-pt"
                    dangerouslySetInnerHTML={{ __html: document?.content || t("userAgreement.content") }}
                  />
                </div>
                
                {document?.version && (
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-pt">
                      Version: {document.version}
                      {document.effectiveDate && ` | Effective Date: ${new Date(document.effectiveDate).toLocaleDateString()}`}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default UserAgreement;
