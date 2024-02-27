"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Place";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Day";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "No. of Renter";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
      text-black
      bg-white
        border-[1px] 
        w-auto
        
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
          text-sm 
            pl-2
            pr-2 
            font-semibold
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div
            className="
              p-2 
              bg-[#10a37f]
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
          <div className="hidden sm:block">
            {/* TODO: develop navbar components 
            
            currently, pressing search will open filters,
            I need to create a button and transfer that functionality to 'filter' button

            Remember that we have categories, you should show that when search button is clicked
            
            */}
            {locationLabel === " " ? (
              <>
                <div className="flex flex-col">
                  <div className="text-lg">Diin ka makadto?</div>
                  <span className="text-gray-600 font-normal">
                    Search for destination!
                  </span>
                </div>
              </>
            ) : (
              locationLabel
            )}
          </div>
        </div>
        <div
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {guestLabel}
        </div>
        <div
          className="
          text-sm 
          font-semibold 
          px-6
          "
        >
          {durationLabel}
        </div>
      </div>
    </div>
  );
};

export default Search;
