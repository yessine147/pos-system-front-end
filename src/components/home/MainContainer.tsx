import { useState } from "react";
import CategoryCard from "./CategoryCard";
import ArticleList from "../article/ArticleList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faCarrot,
  faCheese,
  faBreadSlice,
  faWineBottle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons"; 
import fruitsImage from "./../../assets/fruitsImage.jpeg";
import vegetablesImage from "./../../assets/vegetablesImage.jpeg";
import dairyImage from "./../../assets/dairyImage.jpg";
import bakeryImage from "./../../assets/bakeryImage.jpg";
import beveragesImage from "./../../assets/beveragesImage.jpg";

const categories = [
  { name: "FRUITS", image: fruitsImage, icon: faAppleAlt, color: "bg-red-200" },
  {
    name: "VEGETABLES",
    image: vegetablesImage,
    icon: faCarrot,
    color: "bg-green-200",
  },
  { name: "DAIRY", image: dairyImage, icon: faCheese, color: "bg-yellow-200" },
  {
    name: "BAKERY",
    image: bakeryImage,
    icon: faBreadSlice,
    color: "bg-brown-200",
  },
  {
    name: "BEVERAGES",
    image: beveragesImage,
    icon: faWineBottle,
    color: "bg-purple-200",
  },
];

const MainContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Function to handle click on a category card
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Function to handle click on the back button to go back to categories
  const handleBackClick = () => {
    setSelectedCategory(null); 
  };

  return (
    <div className="min-h-full bg-gray-100 p-8 rounded-lg shadow">
      <nav className="bg-white p-4 shadow mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          {selectedCategory ? selectedCategory : "CATEGORIES"}
        </h1>
        {selectedCategory && (
          <button
            className="text-blue-600 font-semibold flex items-center"
            onClick={handleBackClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{" "}
            Back to Categories
          </button>
        )}
      </nav>
      <main>
        {selectedCategory ? (
          <ArticleList category={selectedCategory} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name} 
                image={category.image} 
                onClick={() => handleCategoryClick(category.name)}
                icon={category.icon} 
                color={category.color}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainContainer;
