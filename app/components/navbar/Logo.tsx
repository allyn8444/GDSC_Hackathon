"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="w-fit flex justify-center items-center hidden md:inline-flex">
      <Image
        onClick={() => router.push("/")}
        className=" cursor-pointer"
        src="/images/arkila-logo.svg"
        height="100"
        width="100"
        alt="Logo"
      />
      <span className="ml-[2rem]">Your lodging, your way</span>
    </div>
  );
};

export default Logo;
