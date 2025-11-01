import React from "react";

const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-5">
      <button
        onClick={onClose}
        className="text-sm text-blue-600 underline mb-3"
      >
        ← Back to list
      </button>

      <h2 className="text-2xl font-bold mb-2">{recipe.strMeal}</h2>
      <p className="text-gray-600 mb-4">Category: {recipe.strCategory}</p>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full rounded mb-4"
      />

      <h3 className="font-semibold mb-2">Instructions:</h3>
      <p className="text-gray-700 mb-4 whitespace-pre-line">
        {recipe.strInstructions}
      </p>

      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
};

export default RecipeDetails;
