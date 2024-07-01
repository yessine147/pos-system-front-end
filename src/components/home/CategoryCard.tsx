import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CategoryCardProps {
  category: string;
  image: string;
  onClick: () => void;
  icon: any;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, image, onClick, icon, color }) => {
  return (
    <div className={`relative cursor-pointer ${color} rounded-lg overflow-hidden`} onClick={onClick}>
      <img src={image} alt={category} className="w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} size="3x" className="text-white" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
        <h3 className="text-lg font-bold">{category}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
