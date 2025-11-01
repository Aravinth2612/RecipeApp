import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onSelect }) => {
  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-gray-600">No recipes found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={() => onSelect(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
