"use client";
import React, { useState } from "react";
import Categories from "./Categories";

const Filter = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div className="relative h-fit">
      <button onClick={toggleCategories} className="flex ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 md:mr-2  "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        <span className="hidden md:block"> Filter</span>
      </button>
      {isCategoriesOpen && (
        <div className="absolute top-[250%] w-[35rem] left-[-1200%] md:w-[100rem] md:left-[-1200%] md:top-[400%]">
          <Categories />
        </div>
      )}
    </div>
  );
};

export default Filter;
