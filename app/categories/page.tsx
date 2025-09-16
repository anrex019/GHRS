"use client";
import { useCategories } from "../hooks/useCategories";
import Header from "../components/Header/Header";
import WorksSlider from "../components/WorksSlider";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import Professional from "../components/Professional";
import Blog from "../components/Blog";
import Section from "../components/Section";
import { Footer } from "../components/Footer";
import { useI18n } from "../context/I18nContext";

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  const { t, locale } = useI18n();


  console.log(categories, '123');

  // Helper to get localized string
  const getLocalized = (value: any): string => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && locale in value) {
      return value[locale] || value.ru || value.en || value.ka || "";
    }
    return "";
  };
  const homePageWorks = [
    {
      id: "1",
      title: "Ортопедия",
      description: "Улучшение динамики и подвижности грудного отдела",
      price: "920 ₽/мес",
      image: "/assets/images/workMan.png",
      exerciseCount: 10,
      categoryName: "Ортопедия",
      monthlyPrice: 920,
      categoryId: "1",
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
      categoryId: "1",
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
      categoryId: "1",
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
      categoryId: "1",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-cinzel font-semibold text-gray-700">
            {t("common.loading")}
          </h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">
            {t("common.error")}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header Section */}
      <Header 
        variant="categories" 
        title={t("navigation.categories")}
        description={getLocalized(categories[0]?.description) || t("header.category_description")}
        info={{
          subcategoriesCount: categories.reduce((total, cat) => total + (cat.subcategories?.length || 0), 0),
          setsCount: categories.reduce((total, cat) => total + (cat.sets?.length || 0), 0),
          exercisesCount: 0
        }}
      />
      <div className="md:pt-[100px] pt-[400px]">
        {/*  */}
        <Section border={0} borderColor="none" />
        <WorksSlider
          title="Комплексы"
          works={homePageWorks}
          fromMain={false}
          seeAll={true}
          scrollable={true}
        />
        <div className="md:my-10">
          <Subscribe
            backgroundImage="/assets/images/categorySliderBgs/bg4.jpg"
            titleKey="subscription.title"
            buttonTextKey="buttons.subscribe"
            buttonTextColor="#3D334A"
            buttonBgColor="#FFFFFF"
            containerStyles="custom-class"
            titleStyles="text-white"
            buttonStyles="hover:opacity-80"
            bgCenter={true}
          />
        </div>
        <div className="md:mb-10">
          {" "}
          <ReviewSlider title="ОТЗЫВЫ О НАС" />
        </div>
        <div
          className="md:mb-10
        "
        >
          {" "}
          <Blog
            withBanner={false}
            withSlider={true}
            layoutType="default"
            title={"GRS МЕДИА"}
          />
        </div>
        <Professional
          title={"GRS Профразвитие"}
          bgColor={"#F9F7FE"}
          withProfText={true}
          withBanner={false}
        />
      </div>
      <Footer />
    </div>
  );
}
