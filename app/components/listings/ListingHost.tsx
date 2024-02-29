/* eslint-disable @next/next/no-img-element */
"use client";

import { SafeUser } from "@/app/types";

interface ListingHostProps {
  user: SafeUser;
}

const ListingHost: React.FC<ListingHostProps> = ({ user }) => {
  return (
    <div className="flex items-center my-4">
      <img
        src={user?.image ?? "/images/placeholder.jpg"}
        alt=""
        style={{ width: 80 }}
        className="rounded-full border border-[#10a37f]"
      />
      <div className="ml-4">
        <h1 className="font-semibold ">{user?.name}</h1>
        <p className="mt-1 text-gray-500">Tigbauan, Iloilo</p>
      </div>
    </div>
  );
};

export default ListingHost;
