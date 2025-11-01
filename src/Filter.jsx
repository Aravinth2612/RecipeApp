import React from "react";

const Filter = ({ categories, selectedCategory, onFilter }) => {
  return (
    <select
      className="border p-2 rounded"
      value={selectedCategory}
      onChange={(e) => onFilter(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.strCategory} value={cat.strCategory}>
          {cat.strCategory}
        </option>
      ))}
    </select>
  );
};

export default Filter;
