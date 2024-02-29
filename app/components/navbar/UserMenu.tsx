"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:underline
            transition 
            cursor-pointer
          "
        >
          Home
        </div>
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:underline
            transition 
            cursor-pointer
          "
        >
          Create Post
        </div>
        <div className="hidden md:block"> {currentUser?.name}</div>

        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-fit
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-[2]
          "
        >
          <div className="flex flex-col cursor-pointer text-black">
            {currentUser ? (
              <>
                <MenuItem label="Trips" onClick={() => router.push("/trips")} />
                <MenuItem
                  label="Favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="Reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="Properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem
                  label="Create Post"
                  onClick={rentModal.onOpen}
                  className="block md:hidden"
                />
                <MenuItem
                  label="Home"
                  onClick={() => router.push("/")}
                  className="block md:hidden"
                />
                <hr />

                <MenuItem
                  label={`Logged in: ${currentUser?.name}`}
                  onClick={rentModal.onOpen}
                  className="block md:hidden"
                />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
