"use client";
import { FC } from "react";
import Image from "next/image";
import { useI18n } from "../context/I18nContext";
import { LinkedinIcon } from "./socialIcons/LinkedinIcon";
import { InstagramIcon } from "./socialIcons/InstagramIcon";
import { YoutubeIcon } from "./socialIcons/YoutubeIcon";
import { VkIcon } from "./socialIcons/VkIcon";
import { FacebookIcon } from "./socialIcons/FacebookIcon";
import { Xicon } from "./socialIcons/X";

export const Footer: FC = () => {
  const { t, locale } = useI18n();

  // Social media links based on language
  const socialLinks = {
    // Russian social networks
    vk: "https://vk.com/ghrsgroup",
    ok: "https://ok.ru/group/70000002767733",
    dzen: "https://dzen.ru/ghrsgroup",
    telegram: "https://t.me/ghrsgroup",
    rutube: "https://rutube.ru/channel/45999134/",
    // International
    youtube: "https://www.youtube.com/@ghrsgroup",
    // English social networks
    instagram: "https://instagram.com/ghrs_group",
    facebook: "https://www.facebook.com/ghrs.gr/",
    twitter: "https://twitter.com/ghrs_group",
    linkedin: "https://www.linkedin.com/in/ghrs-group",
  };

  // Footer links based on language
  const footerLinks = {
    en: {
      userAgreement: "https://ghrs-group.com/rehab/user-agreement",
      consent: "https://ghrs-group.com/consent",
      privacyPolicy: "https://ghrs-group.com/rehab/privacy-policy",
    },
    ru: {
      userAgreement: "https://ghrs-group.ru/polzovatelskoe-soglashenie",
      dataProcessing: "https://ghrs-group.ru/obrabotka-personalnyh-dannyh",
      privacyPolicy: "https://ghrs-group.ru/privacy-policy",
    },
    ka: {
      userAgreement: "https://ghrs-group.com/rehab/user-agreement",
      consent: "https://ghrs-group.com/consent",
      privacyPolicy: "https://ghrs-group.com/rehab/privacy-policy",
    },
  };

  const currentLinks = footerLinks[locale as keyof typeof footerLinks] || footerLinks.en;

  return (
    <div className="bg-[#F9F7FE] rounded-[20px] px-8 pt-8 pb-4 text-[#3D334A]">
      {/* კონსულტაციის ფორმა */}
      <div className="mb-8 px-16">
        <h2 className="text-4xl font-bold text-[#3D334A] mb-8">
          {t("consultation.title")}{" "}
          <span className="text-[#B6A3D9]">{t("consultation.titleHighlight")}</span>
        </h2>
        <form className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder={t("form.name")}
            className="flex-1 rounded-lg px-4 py-3 bg-white/80 outline-none focus:ring-2 focus:ring-[#B6A3D9] transition"
          />
          <input
            type="text"
            placeholder={t("form.phone")}
            className="flex-1 rounded-lg px-4 py-3 bg-white/80 outline-none focus:ring-2 focus:ring-[#B6A3D9] transition"
          />
          <input
            type="email"
            placeholder={t("form.email")}
            className="flex-1 rounded-lg px-4 py-3 bg-white/80 outline-none focus:ring-2 focus:ring-[#B6A3D9] transition"
          />
        </form>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-[#B6A3D9] text-white px-10 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#846FA0] transition-all text-lg shadow-md w-full md:w-auto">
            {t("consultation.button")} <span className="text-2xl">→</span>
          </button>
          <span className="text-[#8B7BAA] mt-2 md:mt-0 max-w-[450px] text-sm">
            {t("consultation.consent")}
          </span>
        </div>
      </div>

      <hr className="my-6 border-[#E0D6F9]" />

      {/* მთავარი ბლოკი */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8 items-center md:items-start px-16">
        {/* მარცხენა */}
        <div className="flex flex-col md:flex-row gap-2 min-w-[220px] items-center">
          <Image
            src="/assets/images/footerLogo.svg"
            alt="GRS Logo"
            width={180}
            height={40}
            className="mb-2"
          />
          <div className="flex flex-col ml-6 gap-5">
            <span className="text-sm text-[#8B7BAA]">{t("workHours")}</span>
            <span className="text-2xl font-bold text-[#3D334A]">
              +7 (916) 856—11—45
            </span>
            <a
              href="mailto:office@ghrs-group.com"
              className="text-[#D4BAFC] text-sm hover:underline"
            >
              office@ghrs-group.com
            </a>
          </div>
        </div>

        {/* სოციალური ღილაკები */}
        <div className="flex gap-3 items-center justify-center mt-4 flex-wrap">
          {/* YouTube - ყველა ენაზე */}
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
          >
            <YoutubeIcon className="w-12 h-12" />
          </a>

          {/* რუსული სოციალური ქსელები */}
          {locale === "ru" && (
            <>
              <a
                href={socialLinks.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <VkIcon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#29B6F6"/>
                  <path d="M10.5 23.5L35.5 13.5L28.5 35.5L23.5 25.5L10.5 23.5Z" fill="white"/>
                </svg>
              </a>
            </>
          )}

          {/* ინგლისური სოციალური ქსელები */}
          {locale === "en" && (
            <>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <InstagramIcon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <FacebookIcon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <Xicon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <LinkedinIcon className="w-12 h-12" />
              </a>
            </>
          )}

          {/* ქართული - ყველა ლინკი */}
          {locale === "ka" && (
            <>
              <a
                href={socialLinks.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <VkIcon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <InstagramIcon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <FacebookIcon className="w-12 h-12" />
              </a>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#B6A3D9]/30 rounded-full p-2 transition flex items-center justify-center"
              >
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#29B6F6"/>
                  <path d="M10.5 23.5L35.5 13.5L28.5 35.5L23.5 25.5L10.5 23.5Z" fill="white"/>
                </svg>
              </a>
            </>
          )}
        </div>
      </div>

      <hr className="my-6 border-[#E0D6F9]" />

{/* ლინკები */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 px-16 text-[#846FA0]">
  <div className="flex flex-col gap-3">
    <a href="#">{t("links.home")}</a>
    <a href="#">{t("links.rehabilitation")}</a>
    <a href="#">{t("links.development")}</a>
    <a href="#">{t("links.blog")}</a>
  </div>
  <div className="flex flex-col gap-3">
    <a href="#">{t("links.about")}</a>
    <a href="#">{t("links.faq")}</a>
    <a href="#">{t("links.userGuide")}</a>
  </div>
  <div className="flex flex-col gap-3">
    <a href="#">{t("links.allSets")}</a>
    <a href="#">{t("links.orthopedics")}</a>
    <ul className="flex flex-col gap-2 pl-4">
      <li><a href="#">{t("links.cervical")}</a></li>
      <li><a href="#">{t("links.thoracic")}</a></li>
      <li><a href="#">{t("links.lumbar")}</a></li>
      <li><a href="#">{t("links.upperLimbs")}</a></li>
      <li><a href="#">{t("links.lowerLimbs")}</a></li>
      <li><a href="#">{t("links.posture")}</a></li>
    </ul>
    <a href="#">{t("links.neurology")}</a>
    <ul className="flex flex-col gap-2 pl-4">
      <li><a href="#">{t("links.parkinsons")}</a></li>
      <li><a href="#">{t("links.stroke")}</a></li>
      <li><a href="#">{t("links.facialNerve")}</a></li>
      <li><a href="#">{t("links.multipleSclerosis")}</a></li>
    </ul>
  </div>
  <div className="flex flex-col gap-3">
    <a href="#">{t("links.aphasia")}</a>
    <a href="#">{t("links.obesity")}</a>
    <a href="#">{t("links.gaitRehab")}</a>
    <a href="#">{t("links.elderlyRehab")}</a>
    <a href="#">{t("links.covidRehab")}</a>
  </div>
</div>

      {/* ქვედა ლოგოები */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 px-16 gap-5">
        <Image
          src="/assets/images/services/asuta.png"
          alt="Assuta"
          width={400}
          height={48}
        />
        <Image
          src="/assets/images/services/asuta.png"
          alt="Assuta"
          width={400}
          height={48}
        />
        <Image
          src="/assets/images/services/asuta.png"
          alt="Assuta"
          width={400}
          height={48}
        />
      </div>

      {/* ქვედა ტექსტი */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#8B7BAA] border-t border-[#E0D6F9] pt-2 text-center md:text-left px-16 gap-2">
        <span>{t("copyright")}</span>
        <a 
          href={currentLinks.userAgreement} 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {t("userAgreement")}
        </a>
        {locale === "ru" ? (
          <a 
            href={(currentLinks as typeof footerLinks.ru).dataProcessing} 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t("dataProcessing")}
          </a>
        ) : (
          <a 
            href={(currentLinks as typeof footerLinks.en).consent} 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t("consent")}
          </a>
        )}
        <a 
          href={currentLinks.privacyPolicy} 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {t("privacyPolicy")}
        </a>
      </div>
    </div>
  );
};