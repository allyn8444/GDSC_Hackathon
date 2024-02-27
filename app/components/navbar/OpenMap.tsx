"use client";
import React, { useState } from "react";
import Categories from "./Categories";

const OpenMap = () => {
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
          className="w-6 h-6 md:mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
        <span className="hidden md:block">Live Map</span>
      </button>
      {isCategoriesOpen && (
        <div className="absolute w-[100rem] right-[-920%] top-[400%]">
          <Categories />
        </div>
      )}
    </div>
  );
};

export default OpenMap;
