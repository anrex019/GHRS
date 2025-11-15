"use client";

import { useEffect, useState } from "react";
import { apiRequest, API_CONFIG } from "../../config/api";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../../context/I18nContext";

interface PurchasedCourse {
  _id: string;
  itemType: "set" | "course";
  setId?: {
    categoryId: string;
    _id: string;
    name: {
      en: string;
      ru: string;
    };
    description: {
      en: string;
      ru: string;
    };
    thumbnailImage?: string;
    duration?: string;
    difficulty?: string;
    price?: {
      monthly: number;
      threeMonths: number;
      sixMonths: number;
      yearly: number;
    };
  };
  courseId?: {
    _id: string;
    title: {
      en: string;
      ru: string;
    };
    description: {
      en: string;
      ru: string;
    };
    thumbnail?: string;
    duration?: number;
    price?: number;
    categoryId?: string;
  };
  createdAt: string;
  expiresAt?: string;
  amount: number;
  currency: string;
}

export default function PurchasedCourses() {
  const [courses, setCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useI18n();

  // Get text based on current locale with fallback
  const getText = (textObj: { en: string; ru: string }) => {
    if (locale === "ka") return textObj.ru; // Use Russian as fallback for Georgian
    return textObj[locale as "en" | "ru"] || textObj.en;
  };

  // Get localized UI text
  const getUIText = (key: string) => {
    const texts = {
      loading: {
        ka: "იტვირთება...",
        ru: "Загружается...",
        en: "Loading...",
      },
      error: {
        ka: "შეცდომა კურსების ჩატვირთვისას",
        ru: "Ошибка при загрузке курсов",
        en: "Error loading courses",
      },
      noCourses: {
        ka: "თქვენ ჯერ არ გაქვთ შეძენილი კურსები",
        ru: "У вас пока нет приобретенных курсов",
        en: "You don't have any purchased courses yet",
      },
      startJourney: {
        ka: "დაიწყეთ თქვენი ჯანმრთელობის მოგზაურობა ჩვენი პროფესიონალური კურსებით",
        ru: "Начните свое путешествие к здоровью с нашими профессиональными курсами",
        en: "Start your health journey with our professional courses",
      },
      viewCourses: {
        ka: "ნახეთ ხელმისაწვდომი კურსები",
        ru: "Посмотреть доступные курсы",
        en: "View available courses",
      },
      dataError: {
        ka: "შეძენილი კურსები ვერ ჩაიტვირთა",
        ru: "Не удалось загрузить приобретенные курсы",
        en: "Failed to load purchased courses",
      },
      dataErrorDesc: {
        ka: "თქვენ გაქვთ {count} შეძენილი ელემენტი, მაგრამ ზოგიერთს არასრული მონაცემები აქვს.",
        ru: "У вас есть {count} приобретенных элементов, но у некоторых неполные данные.",
        en: "You have {count} purchased items, but some have incomplete data.",
      },
      detailedInfo: {
        ka: "დაწვრილებითი ინფორმაცია",
        ru: "Подробная информация",
        en: "Detailed information",
      },
      orthopedics: {
        ka: "ორთოპედია",
        ru: "ОРТОПЕДИЯ",
        en: "ORTHOPEDICS",
      },
      course: {
        ka: "კურსი",
        ru: "КУРС",
        en: "COURSE",
      },
      minutes: {
        ka: "წუთი",
        ru: "минут",
        en: "minutes",
      },
      lessons: {
        ka: "გაკვეთილი",
        ru: "уроков",
        en: "lessons",
      },
      continue: {
        ka: "გაგრძელება",
        ru: "Продолжить",
        en: "Continue",
      },
      free: {
        ka: "უფასო",
        ru: "бесплатно",
        en: "free",
      },
      complex: {
        ka: "კომპლექსი",
        ru: "комплекс",
        en: "complex",
      },
    };

    return (
      texts[key as keyof typeof texts]?.[
        locale as keyof (typeof texts)[keyof typeof texts]
      ] ||
      texts[key as keyof typeof texts]?.["en"] ||
      key
    );
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await apiRequest<PurchasedCourse[]>(
          API_CONFIG.ENDPOINTS.PURCHASES.GET_MY_COURSES
        );
        setCourses(response);
      } catch (err) {
        // If user not authenticated (401), silently handle
        if (err instanceof Error && err.message.includes('401')) {
          console.log('📚 User not authenticated, no purchased courses to display');
          setCourses([]);
        } else {
          setError("შეცდომა კურსების ჩატვირთვისას");
          console.error("Error fetching purchased courses:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">{getUIText("loading")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-700">{getUIText("error")}</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center p-12">
        <div className="bg-gray-50 rounded-xl p-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {getUIText("noCourses")}
          </h3>
          <p className="text-gray-600 mb-6">{getUIText("startJourney")}</p>
          <Link
            href="/chapter"
            className="inline-flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors duration-200"
          >
            {getUIText("viewCourses")}
          </Link>
        </div>
      </div>
    );
  }

  // Debug: ვნახოთ რა მონაცემები მოდის
  console.log("Purchased courses data:", courses);

  // ვფილტრავთ მხოლოდ ვალიდურ მონაცემებს
  const validCourses = courses.filter((course) => {
    if (course.itemType === "set") {
      return course.setId && course.setId._id && course.setId.name;
    }
    if (course.itemType === "course") {
      return course.courseId && course.courseId._id && course.courseId.title;
    }
    return false;
  });

  console.log("Valid courses after filtering:", validCourses);

  if (validCourses.length === 0) {
    return (
      <div className="text-center p-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            {getUIText("dataError")}
          </h3>
          <p className="text-yellow-700 mb-4">
            {getUIText("dataErrorDesc").replace(
              "{count}",
              courses.length.toString()
            )}
          </p>
          <details className="text-left">
            <summary className="cursor-pointer text-yellow-800 font-medium">
              {getUIText("detailedInfo")}
            </summary>
            <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto">
              {JSON.stringify(courses, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* სეტები */}
      {validCourses
        .filter((course) => course.itemType === "set" && course.setId)
        .map((course) => (
          <Link
            href={`/complex/${course.setId!._id}?categoryId=${
              course.setId!.categoryId
            }`}
            key={course._id}
          >
            <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="flex items-start justify-between w-full">
                {/* Left content */}
                <div>
                  <div className="flex-1 pr-8">
                    {/* Brand/Category */}
                    <div className="flex items-center mb-4">
                      <span className="bg-[#E9DFF6] text-[#3D334A] text-[18px] p-[8px] rounded-[6px] uppercase leading-[90%]">
                        {getUIText("orthopedics")}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-[48px] font-bold font-pt text-[#3D334A] mb-4 leading-[100%] group-hover:text-purple-700 transition-colors duration-200 
               line-clamp-2"
                    >
                      {getText(course.setId!.name)}
                    </h2>

                    {/* Description */}
                    <p className="text-[#846FA0] font-bold text-[20px] max-w-[643px] line-clamp-2 font-pt mb-6 leading-[100%]">
                      {getText(course.setId!.description).split("\n")[0]}
                    </p>
                  </div>

                  {/* Course stats */}
                  <div className="flex items-center justify-between mt-52 pr-16">
                    <div className="flex items-center space-x-6">
                      {course.setId!.duration && (
                        <div className="flex items-center text-gray-500">
                          <div className="w-10 h-10 bg-[#D4BAFC] rounded-lg flex items-center justify-center mr-3">
                            <Image
                              src={"/assets/icons/icon.svg"}
                              alt="wallet"
                              width={28}
                              height={20}
                            />
                          </div>
                          <span className="font-medium">
                            {course.setId!.duration} {getUIText("minutes")}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center text-gray-500">
                        <div className="w-10 h-10 bg-[#D4BAFC] rounded-lg flex items-center justify-center mr-3">
                          <Image
                            src={"/assets/icons/wallet.svg"}
                            alt="wallet"
                            width={28}
                            height={20}
                          />
                        </div>
                        <span className="font-medium">
                          2{" "}
                          {locale === "ka"
                            ? "დან"
                            : locale === "ru"
                            ? "из"
                            : "of"}{" "}
                          5 {getUIText("lessons")}
                        </span>
                      </div>
                    </div>

                    {/* Continue button */}
                    <div className="flex items-center justify-end">
                      <button className="group flex items-center bg-[#D4BAFC] hover:bg-[#be9def] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                        <span className="mr-2">{getUIText("continue")}</span>
                        <svg
                          className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right image */}
                <div className="flex-shrink-0">
                  <div className="w-[441px] h-[423px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-200 to-purple-300">
                    {course.setId!.thumbnailImage ? (
                      <Image
                        src={course.setId!.thumbnailImage}
                        alt={getText(course.setId!.name)}
                        width={441}
                        height={423}
                        className="w-full h-full rounded-[20px] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-16 h-16 text-purple-400 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-purple-500 text-sm font-medium">
                            {getUIText("complex")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

      {/* კურსები - დიდი დაშორებით */}
      <div className="pt-20">
        {validCourses
          .filter((course) => course.itemType === "course" && course.courseId)
          .map((course) => (
            <Link
              href={`/singleCourse/${course.courseId!._id}`}
              key={course._id}
            >
              <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 mb-6">
                <div className="flex items-start justify-between w-full">
                  {/* Left content */}
                  <div>
                    <div className="flex-1 pr-8">
                      {/* Brand/Category */}
                      <div className="flex items-center mb-4">
                        <span className="bg-[#E9DFF6] text-[#3D334A] text-[18px] p-[8px] rounded-[6px] uppercase leading-[90%]">
                          {getUIText("course")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-[48px] font-bold font-pt text-[#3D334A] mb-4 leading-[100%] group-hover:text-purple-700 transition-colors duration-200 
                 line-clamp-2"
                      >
                        {getText(course.courseId!.title)}
                      </h2>

                      {/* Description */}
                      <p className="text-[#846FA0] font-bold text-[20px] max-w-[643px] line-clamp-2 font-pt mb-6 leading-[100%]">
                        {getText(course.courseId!.description).split("\n")[0]}
                      </p>
                    </div>

                    {/* Course stats */}
                    <div className="flex items-center justify-between mt-52 pr-16">
                      <div className="flex items-center space-x-6">
                        {course.courseId!.duration && (
                          <div className="flex items-center text-gray-500">
                            <div className="w-10 h-10 bg-[#D4BAFC] rounded-lg flex items-center justify-center mr-3">
                              <Image
                                src={"/assets/icons/icon.svg"}
                                alt="duration"
                                width={28}
                                height={20}
                              />
                            </div>
                            <span className="font-medium">
                              {course.courseId!.duration} {getUIText("minutes")}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center text-gray-500">
                          <div className="w-10 h-10 bg-[#D4BAFC] rounded-lg flex items-center justify-center mr-3">
                            <Image
                              src={"/assets/icons/wallet.svg"}
                              alt="price"
                              width={28}
                              height={20}
                            />
                          </div>
                          <span className="font-medium">
                            {course.courseId!.price
                              ? `$${course.courseId!.price}`
                              : getUIText("free")}
                          </span>
                        </div>
                      </div>

                      {/* Continue button */}
                      <div className="flex items-center justify-between">
                        <button className="group flex items-center hover:text-[#372947] text-[#3D334A] font-medium transition-transform duration-200">
                          <span className="mr-2">{getUIText("continue")}</span>
                          <svg
                            className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right image */}
                  <div className="flex-shrink-0">
                    <div className="w-[441px] h-[423px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
                      {course.courseId!.thumbnail ? (
                        <Image
                          src={course.courseId!.thumbnail}
                          alt={getText(course.courseId!.title)}
                          width={441}
                          height={423}
                          className="w-full h-full rounded-[20px] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <svg
                              className="w-16 h-16 text-blue-400 mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                            <span className="text-blue-500 text-sm font-medium">
                              {getUIText("course").toLowerCase()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
