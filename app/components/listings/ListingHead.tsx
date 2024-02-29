"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col md:flex-row ">
        {/* Heading */}
        <Heading
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
        {/*  */}
        <div className=" h-auto md:flex md:ml-5">
          {/* HOW FAR */}
          <div className=" text-black my-2 md:my-0 mr-10 pt-2 w-fit whitespace-nowrap ">
            1.5km away
          </div>
          {/* Rating - VIEW */}
          <div className="w-full h-[3rem]  flex flex-row font-bold text-lg gap-6 ">
            {/* rate */}
            <span className="flex border-[3px] border-black text-black w-[6rem] justify-center items-center rounded-lg">
              <h2 className="mr-2">4.7</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </span>
            {/* 360 view  */}
            <button
              onClick={() => {
                alert("Function not yet deployed");
              }}
              className="bg-[#10a37f] flex items-center justify-center rounded-lg p-4 md:px-4 w-fit md:w-auto "
            >
              <h2> View in 360&deg;</h2>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingHead;
