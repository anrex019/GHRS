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

  // TEMPORARY: Mock subcategories for testing (remove when backend has real data)
  const mockSubcategories = allSubcategories.length === 0 ? [
    {
      _id: "mock-sub-1",
      name: { ru: "Шейный отдел позвоночника", en: "Cervical Spine", ka: "ყელის მალა" },
      description: { ru: "Упражнения для улучшения подвижности и укрепления шейного отдела позвоночника", en: "Exercises to improve mobility and strengthen the cervical spine", ka: "ვარჯიშები ყელის მალის მობილურობის გასაუმჯობესებლად" },
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=542&h=181&fit=crop",
      sets: ["1", "2", "3"]
    },
    {
      _id: "mock-sub-2",
      name: { ru: "Грудной отдел позвоночника", en: "Thoracic Spine", ka: "გულმკერდის მალა" },
      description: { ru: "Комплекс упражнений для грудного отдела позвоночника и улучшения осанки", en: "Exercise complex for thoracic spine and posture improvement", ka: "ვარჯიშები გულმკერდის მალისთვის" },
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=542&h=181&fit=crop",
      sets: ["4", "5"]
    },
    {
      _id: "mock-sub-3",
      name: { ru: "Поясничный отдел позвоночника", en: "Lumbar Spine", ka: "წელის მალა" },
      description: { ru: "Упражнения для укрепления поясничного отдела и профилактики болей в спине", en: "Exercises to strengthen lumbar spine and prevent back pain", ka: "ვარჯიშები წელის მალის გასაძლიერებლად" },
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=542&h=181&fit=crop",
      sets: ["6", "7", "8"]
    },
    {
      _id: "mock-sub-4",
      name: { ru: "Плечевой сустав", en: "Shoulder Joint", ka: "მხრის სახსარი" },
      description: { ru: "Упражнения для восстановления и укрепления плечевого сустава", en: "Exercises for shoulder joint recovery and strengthening", ka: "ვარჯიშები მხრის სახსრის აღდგენისთვის" },
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=542&h=181&fit=crop",
      sets: ["9", "10"]
    },
    {
      _id: "mock-sub-5",
      name: { ru: "Коленный сустав", en: "Knee Joint", ka: "მუხლის სახსარი" },
      description: { ru: "Реабилитация и профилактика травм коленного сустава", en: "Knee joint rehabilitation and injury prevention", ka: "მუხლის სახსრის რეაბილიტაცია" },
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=542&h=181&fit=crop",
      sets: ["11", "12", "13"]
    }
  ] : [];

  // Use real subcategories if they exist, otherwise use mock data
  const displaySubcategories = allSubcategories.length > 0 ? allSubcategories : mockSubcategories;
  
  console.log("📌 Displaying subcategories:", displaySubcategories.length, "items");
  console.log("📌 Using:", allSubcategories.length > 0 ? "REAL backend data" : "MOCK data (backend has no subcategories)");

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
          subcategories={displaySubcategories}
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
