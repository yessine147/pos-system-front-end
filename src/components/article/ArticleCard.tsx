import React from "react";

interface ArticleCardProps {
  article: {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
  };
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div className="relative cursor-pointer rounded-lg overflow-hidden shadow-md">
      <img
        src={article.image}
        alt={article.name}
        className="w-full h-40 object-cover opacity-75"
      />
      <div className="absolute inset-0 flex items-center justify-center"></div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
        <h3 className="text-lg font-bold">{article.name}</h3>
        <p className="text-sm">
          ${article.price} - {article.category}
        </p>
      </div>
      <div className="absolute inset-0 z-10" onClick={onClick} />
    </div>
  );
};

export default ArticleCard;
