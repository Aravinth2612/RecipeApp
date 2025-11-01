import React from "react";

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div
      className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
        {recipe.strCategory && (
          <p className="text-gray-500 text-sm">{recipe.strCategory}</p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
