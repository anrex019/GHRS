"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "ka" | "ru" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: Record<string, string>) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

export const useLanguage = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLanguage must be used within an I18nProvider");
  }
  return { language: context.locale };
};

interface I18nProviderProps {
  children: React.ReactNode;
}

// Helper function for nested keys
const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  const value = path.split(".").reduce(
    (o: unknown, p: string) =>
      o && typeof o === "object" && p in o
        ? (o as Record<string, unknown>)[p]
        : undefined,
    obj
  );
  return value === undefined ? path : (value as string);
};

// Deep merge translations
const deepMerge = (
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> => {
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (
      key in target &&
      typeof target[key] === "object" &&
      target[key] !== null &&
      typeof source[key] === "object" &&
      source[key] !== null
    ) {
      output[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale;
      console.log("🔍 I18nProvider initializing, savedLocale:", savedLocale);
      if (savedLocale && ["ka", "ru", "en"].includes(savedLocale)) {
        console.log("✅ Using saved locale:", savedLocale);
        return savedLocale;
      }
      // თუ არ არის შენახული, დავაყენოთ default და შევინახოთ
      console.log("⚠️ No saved locale, setting default to 'ka'");
      localStorage.setItem("locale", "ka");
    }
    return "ka";
  });

  const [translationData, setTranslationData] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("📚 Loading translations for locale:", locale);
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const files = [
          "common",
          "home",
          "advantages",
          "subscribe",
          "sets",
          "header",
          "components",
          "personalAccount",
          "footer",
          "contact",
          "rehabilitation",
          "course",
          "professional",
          "legal"
        ];

        // ჯერ ცალკე ფაილებიდან ჩატვირთვა
        const translations = await Promise.all(
          files.map((file) =>
            fetch(`/locales/${locale}/${file}.json`)
              .then((res) => res.json())
              .catch(() => ({})) // თუ ფაილი არ არსებობს, დააბრუნე ცარიელი
          )
        );

        let mergedTranslations = translations.reduce<Record<string, unknown>>(
          (acc, curr) => deepMerge(acc, curr as Record<string, unknown>),
          {}
        );

        // შემდეგ სცადე მთავარი locale ფაილის ჩატვირთვა (ru.json, ka.json, en.json)
        // ეს არის optional და არ არის აუცილებელი
        try {
          const mainLocaleResponse = await fetch(`/locales/${locale}.json`);
          if (mainLocaleResponse.ok) {
            const mainLocaleFile = await mainLocaleResponse.json();
            mergedTranslations = deepMerge(mergedTranslations, mainLocaleFile as Record<string, unknown>);
          }
        } catch (error) {
          // No main locale file found, using split files only - this is expected
        }

        console.log("✅ Translations loaded for:", locale);
        setTranslationData(mergedTranslations);
      } catch (error) {
        console.error("❌ Failed to load translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    console.log("🌍 setLocale called:", { current: locale, new: newLocale });
    if (newLocale !== locale) {
      console.log("✅ Updating locale to:", newLocale);
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
      console.log("💾 Locale saved to localStorage:", newLocale);
    } else {
      console.log("⏭️ Locale unchanged, skipping update");
    }
  };

  const t = (key: string, options?: Record<string, string>): string => {
    let translation = getNestedValue(translationData, key);

    if (translation === key) return key;

    if (typeof translation === "object" && translation !== null) {
      const localeValue = (translation as Record<string, string>)[locale];
      if (typeof localeValue === "string") {
        translation = localeValue;
      } else {
        return `[[Missing translation for ${key}]]`;
      }
    }

    if (options && typeof translation === "string") {
      Object.keys(options).forEach((optionKey) => {
        translation = translation.replace(
          `{{${optionKey}}}`,
          options[optionKey]
        );
      });
    }

    return typeof translation === "string"
      ? translation
      : `[[Invalid translation for ${key}]]`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading translations...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </I18nContext.Provider>
  );
};