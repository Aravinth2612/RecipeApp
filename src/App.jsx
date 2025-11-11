import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("chicken");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, selectedCategory]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let meals = [];

      if (selectedCategory) {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        meals = res.data.meals || [];

        if (searchTerm) {
          meals = meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      } else {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        meals = res.data.meals || [];
      }

      setRecipes(meals);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );
      setCategories(res.data.meals);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5 text-[#E96D71]">
        🍽️ Recipe Explorer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onFilter={handleFilter}
        />
        <SearchBar onSearch={handleSearch} />
      </div>

      {selectedRecipe ? (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      ) : (
        <RecipeList recipes={recipes} onSelect={setSelectedRecipe} />
      )}
    </div>
  );
};

export default App;
