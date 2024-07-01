import React from "react";
import { useQuery } from "react-query";
import { getArticleByCategory } from "../../api/ArticleApi";
import ArticleCard from "./ArticleCard";
import { useOrder } from "../../context/OrderContext";
import { Article } from "../../types/Article";

interface ArticleListProps {
  category: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ category }) => {
  const { data, error, isLoading } = useQuery("articles", () =>
    getArticleByCategory(category)
  );
  const { dispatch } = useOrder();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles</div>;
  if (data?.length === 0)
    return <div>there is no articles in this category</div>;

  const handleClick = (article: Article) => {
    dispatch({ type: "ADD_ARTICLE", payload: article });
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Articles</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((article: any) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => handleClick(article)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
