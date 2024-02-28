"use client";
import React, { useState } from "react";

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
        <div
          className="absolute inset-0 flex justify-center items-center
                       top-[23rem] lg:top-[21rem] left-[-550%]"
        >
          <div className="relative">
            <div
              className="absolute top-1/2 left-1/2 transform
                          -translate-x-1/2 -translate-y-1/2 bg-white
                          p-6 rounded-lg shadow-2xl w-[65vw] md:w-[90vw]"
            >
              {/* Content of your absolute div */}

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.269736026401!2d122.55977797524383!3d10.71366618943132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5164455e2ad%3A0xa7e54669fcaddf3!2sWest%20Visayas%20State%20University!5e0!3m2!1sen!2sph!4v1709100315382!5m2!1sen!2sph"
                // width="1000"
                // height="600"
                className="w-full  h-[60vh]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenMap;
