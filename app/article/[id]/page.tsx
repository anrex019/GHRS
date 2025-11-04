"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Article from "../../components/Article";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar";
import { getDefaultMenuItems } from "@/app/components/Header/Header";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import { getArticleById } from "../../api/articles";
import type { Article as ArticleType } from "../../api/articles";
import { Footer } from "@/app/components/Footer";
import { useI18n } from "../../context/I18nContext";

export default function ArticlePage() {
  const params = useParams();
  const { locale, t } = useI18n();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const menuItems = getDefaultMenuItems(t);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid article ID");
        setLoading(false);
        return;
      }

      try {
        const data = await getArticleById(params.id);
        setArticle(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  // Update page title when article is loaded
  useEffect(() => {
    if (article) {
      const getLocalizedText = (field: { en: string; ru: string; ka?: string }) => {
        return field[locale as keyof typeof field] || field.ru || field.en || "";
      };
      const title = getLocalizedText(article.title);
      document.title = `${title} - GRS`;
    }
  }, [article, locale]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="bg-[#F9F7FE] py-1">
      <DesktopNavbar
        menuItems={menuItems}
        blogBg={true}
        allCourseBg={false}
        data={article}
      />
      <MobileNavbar />

      <div className="mx-10">
        <Article article={article} />
      </div>
      <Footer />
    </div>
  );
}
