"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { IoMdClose } from "react-icons/io";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import Button from "@/app/components/Button";
import Contract from "@/app/components/listings/Contract";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [showContract, setShowContract] = useState(false); // State variable to toggle Contract component visibility

  // for contract pop up
  // const contract = () => {
  //   return (
  //     <>
  //       <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center z-10 bg-white">
  //         <div className=" w-full h-[90vh]">
  //           <button
  //             className="
  //                   p-1
  //                   border-0
  //                   hover:opacity-70
  //                   transition
  //                   absolute
  //                   right-9
  //                   text-black
  //                 "
  //           >
  //             <IoMdClose size={40} />
  //           </button>
  //           {/* Content */}
  //           {/* <p className="text-center">Test</p>  w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4*/}
  //           <iframe
  //             src="https://docs.google.com/document/d/1e2c99FBPoBKP5sdH38pXMNk5kutps5ZMzOi3hkLgArs/edit?usp=sharing"
  //             width="100%"
  //             height="100%"
  //             className=""
  //           />
  //         </div>
  //         <div className="border-t-2 border-slate-800 flex  w-full justify-center items-center">
  //           <p className="flex justify-center items-center text-black">
  //             1. Click the &#34;Download&#34; button to save the form to your
  //             device.
  //             {/* <IoMdClose size={18} /> import { IoMdClose } from "react-icons/io"; */}
  //             <br />
  //             2. Open the downloaded form and fill it out with your information.
  //           </p>
  //           <div className="w-[8rem] m-4">
  //             <Button
  //               label="Download"
  //               onClick={() => {
  //                 window.open(
  //                   "https://docs.google.com/document/d/1e2c99FBPoBKP5sdH38pXMNk5kutps5ZMzOi3hkLgArs/export?format=docx",
  //                   "_blank"
  //                 );
  //               }}
  //             />
  //           </div>
  //           <div className="w-[8rem] m-4">
  //             <Button label="Continue" onClick={() => {}} />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/bookings", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          md:pt-[6.25rem]
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            {/* CONTRACT MANAGEMENT */}
            {/* {contract()} */}
            {/* <Contract onCreateReservation={onCreateReservation} /> */}
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                // onSubmit={onCreateReservation}
                onSubmit={() => setShowContract(true)} // Set showContract to true when onSubmit is called
                disabled={isLoading}
                disabledDates={disabledDates}
              />
              {showContract && ( // Conditionally render Contract component based on showContract state
                <Contract
                  onCreateReservation={onCreateReservation}
                  visible={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
