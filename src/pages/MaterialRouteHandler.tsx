import React from "react";
import { useParams } from "react-router-dom";
import ArticlePage from "./ArticlePage";
import MaterialsPage from "./MaterialsPage";
import { getArticleBySlug } from "../data/articlesData";

/**
 * Smart router for /materiais/:slug
 * - If the slug corresponds to an in-depth article, renders ArticlePage
 * - If the slug corresponds to an e-book, video, or catalog material, renders MaterialsPage targeted to that item
 */
export default function MaterialRouteHandler() {
  const { slug } = useParams<{ slug: string }>();

  // Check if there is an article matching this slug
  const article = slug ? getArticleBySlug(slug) : undefined;
  if (article) {
    return <ArticlePage />;
  }

  // Otherwise, route to MaterialsPage focusing on this specific material ID or slug
  return <MaterialsPage targetMaterialId={slug} />;
}
