import React from "react";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import { useI18n } from "../../context/I18nContext";

function SubHeader({ ShowText = true, ShowIcons = true }) {
  const { t } = useI18n();
  
  return (
    <div>
      <div className="rounded-[20px] px-5 relative mx-6">
        <Image
          width={1020}
          height={718}
          src={"/assets/images/blogbg.jpg"}
          alt="blogBg"
          className="md:h-[718px] md:w-full h-[317px] w-full object-cover object-center rounded-[20px]"
          priority
        />
        {ShowText && (
          <div className="pt-[27px] md:pl-[32px] pl-4 pr-[20px] md:pb-[20px] pb-3 md:bg-[#3D334A4D] md:backdrop-blur-sm absolute bottom-0 md:bottom-5 md:ml-5 rounded-[20px]">
            <h2 className="hidden md:flex text-white text-[40px] leading-[120%] tracking-[-3%] md:w-[945px] w-[327px]">
              {t("blog.banner.title")}
            </h2>
            <h2 className="flex md:hidden font-bowler text-white text-[18px] leading-[120%] tracking-[-3%] mb-2.5">
              {t("blog.banner.mobile_title")}
            </h2>
            <p className="mt-[66px] mb-[28px] hidden md:flex font-bold leading-[120%] w-[650px]">
              {t("blog.banner.description")}
            </p>
            <span className="text-[#3D334A] p-2 rounded-[8px] bg-[#E9DFF6] text-[18px] leading-[90%] uppercase font-bowler">
              {t("blog.banner.category")}
            </span>
          </div>
        )}
        {ShowIcons && (
          <div className="absolute md:top-5 top-2 md:right-5 right-2 mr-5 flex flex-col gap-2">
            <CiBookmark
              size={40}
              color="#3D334A"
              className="w-10 h-10 bg-white/30 rounded-[6px] p-2.5 cursor-pointer"
            />
            <RiShareForwardLine
              size={40}
              color="#3D334A"
              className="w-10 h-10 bg-white/30 rounded-[6px] p-2.5 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SubHeader;
