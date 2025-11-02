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

  // Calculate statistics
  const subcategoriesCount = displaySubcategories.length;
  const setsCount = sets.length;
  const exercisesCount = sets.reduce((total: number, set: any) => total + (set.totalExercises || 0), 0);
  
  // Get the main category name (for now, we'll use a general title, but this can be dynamic per category)
  const mainCategory = categories.find((cat: any) => !cat.parentId);
  const categoryTitle = mainCategory ? getLocalized(mainCategory.name) : (t("common.categories") || "Категории");

  return (
    <div className="">
      {/* Header Section with dynamic statistics */}
      <div className="relative rounded-[20px] h-[100vh] md:h-[85vh] md:m-6 overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg absolute h-full w-full object-cover z-[-1] md:rounded-[20px]"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Statistics overlay */}
        <div className="absolute bottom-16 left-16 z-10 max-w-[90%]">
          {/* Stats badges */}
          <div className="flex flex-wrap gap-3 mb-4">
            {/* Sections badge with glassmorphism */}
            <div className="relative w-[247px] h-[64px]">
              {/* Glass background */}
              <div className="absolute inset-0 bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[15px]"></div>
              {/* Content */}
              <div className="relative w-full h-full px-5 py-2.5 flex items-center gap-2">
                <div className="w-[46px] h-[44px] bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[10px] flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2H15V8H21V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-['PT_Root_UI'] text-white text-base font-medium">
                  {subcategoriesCount} {t("common.sections") || "разделов"}
                </span>
              </div>
            </div>

            {/* Complexes badge with glassmorphism */}
            <div className="relative w-[247px] h-[64px]">
              {/* Glass background */}
              <div className="absolute inset-0 bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[15px]"></div>
              {/* Content */}
              <div className="relative w-full h-full px-5 py-2.5 flex items-center gap-2">
                <div className="w-[46px] h-[44px] bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[10px] flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-['PT_Root_UI'] text-white text-base font-medium">
                  {setsCount} {t("common.complexes") || "комплексов"}
                </span>
              </div>
            </div>

            {/* Exercises badge with glassmorphism */}
            <div className="relative w-[247px] h-[64px]">
              {/* Glass background */}
              <div className="absolute inset-0 bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[15px]"></div>
              {/* Content */}
              <div className="relative w-full h-full px-5 py-2.5 flex items-center gap-2">
                <div className="w-[46px] h-[44px] bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[10px] flex items-center justify-center">
                  <img 
                    src="/assets/images/Video.png" 
                    alt="video icon" 
                    width={30} 
                    height={30}
                    className="w-[30px] h-[30px]"
                  />
                </div>
                <span className="font-['PT_Root_UI'] text-white text-base font-medium">
                  {exercisesCount} {t("common.exercises") || "упражнений"}
                </span>
              </div>
            </div>
          </div>

          {/* Category title with glassmorphism */}
          <div className="relative w-[779px] h-[158px]">
            {/* Glass background */}
            <div className="absolute inset-0 bg-[#3D334A]/30 backdrop-blur-[20px] rounded-[20px]"></div>
            {/* Content */}
            <div className="relative w-full h-full px-6 py-3 flex items-center">
              <h1 className="font-[Bowler] text-white text-3xl md:text-4xl uppercase tracking-wide">
                {categoryTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="md:pt-[100px] pt-[400px]">
        {/* Разделы (Subcategories) */}
        <Section 
          border={0} 
          borderColor="none" 
          subcategories={displaySubcategories}
        />
        
        {/* Комплексы (Sets) */}
        <WorksSlider
          title={t("common.complexes") || "Комплексы"}
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
          <ReviewSlider title={t("common.reviews_title") || "ОТЗЫВЫ О НАС"} />
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
            title={t("common.grs_media") || "GRS МЕДИА"}
          />
        </div>
        <Professional
          title={t("common.grs_professional") || "GRS Профразвитие"}
          bgColor={"#F9F7FE"}
          withProfText={true}
          withBanner={false}
        />
      </div>
      <Footer />
    </div>
  );
}