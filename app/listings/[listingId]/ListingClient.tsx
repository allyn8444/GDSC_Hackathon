/* eslint-disable @next/next/no-img-element */
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
import Avatar from "@/app/components/Avatar";
import ListingHost from "@/app/components/listings/ListingHost";

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

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
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

  const amenities = [
    {
      icon: "/images/WIFI.svg",
      label: "WiFi",
    },
    {
      icon: "/images/Kitchen.png",
      label: "Kitchen",
    },
    {
      icon: "/images/TV.png",
      label: "Television",
    },
    {
      icon: "/images/Aircon.png",
      label: "Air Condition",
    },
    
    {
      icon: "/images/Washer.svg",
      label: "Washer",
    },
    {
      icon: "/images/Dryer.svg",
      label: "Dryer",
    },
  ];

  const sustainable = [
    {
      icon: "/images/lightbulb.png",
      label: "Energy Efficiency",
    },
    {
      icon: "/images/trash.png",
      label: "Waste Management",
    },
    {
      icon: "/images/recycle.png",
      label: "Use of Sustainable Materials",
    },
  ];

  const services = [
    {
      icon: "/images/plug.png",
      label: "Utilities",
    },
    {
      icon: "/images/wrench.png",
      label: "Maintenance",
    },
    {
      icon: "/images/shield.png",
      label: "Security",
    },
    {
      icon: "/images/money.png",
      label: "Value",
    },
  ];
  return (
    <Container>
      <div
        className="
        //container of full list view (per post)
      
        
          max-w-screen-lg 
          mx-auto
          md:pt-[8rem]
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
          {/* AMENITIES */}
          <div className="">
            <h2 className="text-2xl text-black font-bold">Amenities</h2>
            <div className="mt-2 lg:mt-0 h-fit lg:h-[5rem] grid grid-cols-2 gap-2 lg:gap-0 md:grid-cols-3 lg:flex lg:items-center lg:justify-between px-5 lg:px-8">
              {amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex text-[#10a37f] items-center gap-2 p-1 md:p-2 rounded-lg border-2 border-[#10a37f]"
                >
                  <img src={item.icon} alt={item.label} className="w-8 h-8 " />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </div>
            <div className=" w-full block flex justify-end px-5 text-black py-2 lg:py-0 hover:underline">
              <button
                onClick={() => {
                  alert("Function not yet deployed");
                }}
              >
                Show all amenities.
              </button>
            </div>
          </div>
          {/* CONTENT - BODY */}
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              
              
            "
          >
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
          <hr className="md:hidden" />
          {/* REVIEW */}
          <div className="text-black grid-cols-1 grid md:grid-cols-2 mt-8 md:mt-10">
            {/* overall rating */}
            <div className="">
              <div className="flex gap-2 items-center">
                <h1 className="text-3xl font-bold">Overall Rating</h1>
                {/* rate */}
                <span className="flex border-[3px] border-black text-black py-1 px-3 justify-center items-center rounded-lg">
                  <h2 className="mr-2 text-2xl font-bold">4.7</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </span>
              </div>

              <div className="flex flex-col">
                {/* SUSTAINABLE: RATING */}
                <div className=" flex flex-col mt-4">
                  {/* rate */}
                  <span className="mb-3 flex bg-[#10a37f] w-fit text-white px-3 py-1 justify-center items-center rounded-lg">
                    <h2 className="mr-2 text-xl font-bold">4.9</h2>
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
                  {sustainable.map((item, index) => (
                    <>
                      <div key={index} className="flex items-center my-1">
                        <img src={item.icon} alt="" className="w-7 h-7 mr-4" />
                        <p className="font-bold">{item.label}</p>
                      </div>
                    </>
                  ))}
                </div>
                {/* SERVICES: RATING */}
                <div className="flex flex-col mt-5">
                  {/* rate */}
                  <span className="mb-3 flex px-3 py-1 text-black border-2 border-black w-fit justify-center items-center rounded-lg">
                    <h2 className="mr-2 text-xl font-bold">4.5</h2>
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
                  {services.map((item, index) => (
                    <>
                      <div key={index} className="flex  items-center my-2">
                        <img src={item.icon} alt="" className="w-7 h-7 mr-4" />
                        <p className="font-bold">{item.label}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* review - comments */}
            <hr className="my-8 md:my-0 md:hidden" />
            <div className="">
              <div className="flex font-bold">
                <span>123</span>
                <h3>&nbsp;Reviews</h3>
              </div>
              {/* search */}
              <form action="" className="flex items-center mt-2 mb-4">
                <div className="relative flex items-center w-full block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search Reviews"
                    className="pl-10 pr-4 py-2 rounded-lg w-full border border-black focus:border-[#10a37f] focus:ring-[#10a37f] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    alert("Function not yet deployed");
                  }}
                  className="mx-2 px-4 py-2 bg-[#10a37f] text-white rounded-lg  focus:outline-none"
                >
                  Search
                </button>
              </form>
              {/* comments */}
              <div className="flex flex-col ">
                <div className="flex flex-col ">
                  <div className="flex items-center">
                    <img
                      src="/images/placeholder.jpg"
                      alt=""
                      className="bg-white h-20 w-20 rounded-full border border-black"
                    />
                    <div className="flex flex-col  justify-center ml-4">
                      {/* stars */}
                      <div className="flex my-2  items-center">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            <img src="/images/star.png" alt="" />
                          </span>
                        ))}
                        <span className="ml-2 text-gray-400">2 days ago</span>
                      </div>
                      {/* commenter */}
                      <div className="flex">
                        <span className="font-semibold">Dallas Aquino</span>
                        <span className="mx-3 text-gray-500">
                          Pavia, Iloilo
                        </span>
                      </div>
                      {/* comment: */}
                      <div className="mt-4">Great Service</div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <hr className="my-4" />
                <div className="flex flex-col ">
                  <div className="flex items-center">
                    <img
                      src="/images/placeholder.jpg"
                      alt=""
                      className="bg-white h-20 w-20 rounded-full border border-black"
                    />
                    <div className="flex flex-col  justify-center ml-4">
                      {/* stars */}
                      <div className="flex my-2  items-center">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            <img src="/images/star.png" alt="" />
                          </span>
                        ))}
                        <span className="ml-2 text-gray-400">3 weeks ago</span>
                      </div>
                      {/* commenter */}
                      <div className="flex">
                        <span className="font-semibold">Kirk Gamo</span>
                        <span className="mx-3 text-gray-500">
                          La Paz, Iloilo
                        </span>
                      </div>
                      {/* comment: */}
                      <div className="mt-4">Good view</div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <hr className="my-4" />
                <div className="flex flex-col ">
                  <div className="flex items-center">
                    <img
                      src="/images/placeholder.jpg"
                      alt=""
                      className="bg-white h-20 w-20 rounded-full border border-black"
                    />
                    <div className="flex flex-col  justify-center ml-4">
                      {/* stars */}
                      <div className="flex my-2 items-center">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            <img src="/images/star.png" alt="" />
                          </span>
                        ))}
                        <span className="ml-2 text-gray-400">1 week ago</span>
                      </div>
                      {/* commenter */}
                      <div className="flex">
                        <span className="font-semibold">Brennan Terre</span>
                        <span className="mx-3 text-gray-500">
                          Tigbauan, Iloilo
                        </span>
                      </div>
                      {/* comment: */}
                      <div className="mt-4">Spacious and clean</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ABOUT THE HOST */}
          <hr className="md:hidden my-4" />

          <div className="text-black mt-6">
            <div className="w-full md:w-[50%]">
              <h1 className="text-2xl font-bold ">About the host</h1>

              <ListingHost user={listing.user} />
              {/* stars */}
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    <img src="/images/star.png" alt="" />
                  </span>
                ))}
              </div>
              <p className="my-4">
                As the owner of a boarding house, my priority is to provide a
                safe, welcoming, and nurturing environment where residents can
                thrive and feel at home. I am committed to maintaining high
                standards of cleanliness, security, and maintenance to ensure
                the well-being and satisfaction of all residents.
              </p>
              <span className="w-[30%] block">
                <Button
                  label="Contact Host"
                  onClick={() => {
                    alert("Function not yet deployed");
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
