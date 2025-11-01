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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecipes("chicken");
    fetchCategories();
  }, []);

  const fetchRecipes = async (query) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(res.data.meals || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );
      setCategories(res.data.meals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchRecipes(term);
  };

  const handleFilter = async (category) => {
    setSelectedCategory(category);
    if (category === "") {
      fetchRecipes("chicken");
      return;
    }
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    setRecipes(res.data.meals || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5 text-[#E96D71]">
        🍽️ Recipe Explorer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
        <SearchBar onSearch={handleSearch} />
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onFilter={handleFilter}
        />
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
