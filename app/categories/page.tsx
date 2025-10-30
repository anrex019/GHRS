"use client";
import { useCategories } from "../hooks/useCategories";
import { useAllSets } from "../hooks/useSets";
import Header from "../components/Header/Header";
import WorksSlider from "../components/WorksSlider";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import Professional from "../components/Professional";
import Blog from "../components/Blog";
import Section from "../components/Section";
import { Footer } from "../components/Footer";
import MainHeader from "../components/Header/MainHeader";
import { useI18n } from "../context/I18nContext";

export default function CategoriesPage() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { sets, loading: setsLoading, error: setsError } = useAllSets();
  const { t, locale } = useI18n();

  console.log("📊 Categories Page Data:");
  console.log("  Total categories:", categories.length);
  console.log("  Categories:", categories);
  console.log("  Total sets:", sets.length);
  console.log("  Sets:", sets);

  // Helper to get localized string
  const getLocalized = (value: any): string => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && locale in value) {
      return value[locale] || value.ru || value.en || value.ka || "";
    }
    return "";
  };

  // Get all subcategories (categories with parentId) and transform them
  const allSubcategories = categories
    .filter((cat: any) => cat.parentId)
    .map((cat: any) => ({
      _id: cat._id,
      name: cat.name,
      description: cat.description,
      image: cat.image || undefined, // Convert null to undefined
      sets: cat.sets || [],
    }));

  console.log("🔍 Subcategories Analysis:");
  console.log("  Categories with parentId:", categories.filter((cat: any) => cat.parentId).length);
  console.log("  Transformed subcategories:", allSubcategories.length);
  console.log("  Subcategories data:", allSubcategories);

  // Transform sets data for WorksSlider
  const transformedSets = sets.map((set: any) => ({
    id: set._id,
    title: getLocalized(set.name),
    description: getLocalized(set.description),
    price: `${set.price?.monthly || 0} ₽/мес`,
    image: set.thumbnailImage || "/assets/images/workMan.png",
    exerciseCount: set.totalExercises || 0,
    categoryName: getLocalized(set.category?.name),
    monthlyPrice: set.price?.monthly || 0,
    categoryId: set.categoryId || set._id,
  }));

  // Loading state
  const loading = categoriesLoading || setsLoading;
  const error = categoriesError || setsError;

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
      {/* <Header variant="categories" /> */}
      <MainHeader
        ShowBlock={false}
        OptionalComponent={null}
        stats={[]}
        showArrows={false}
      />
      <div className="md:pt-[100px] pt-[400px]">
        {/* Разделы (Subcategories) */}
        <Section 
          border={0} 
          borderColor="none" 
          subcategories={allSubcategories}
        />
        
        {/* Комплексы (Sets) */}
        <WorksSlider
          title="Комплексы"
          works={transformedSets}
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
            href="/shoppingcard"
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
