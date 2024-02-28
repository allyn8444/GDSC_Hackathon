import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Filter from "./Filter";
import OpenMap from "./OpenMap";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
          bg-[#10a37f]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
            
          "
          >
            <Logo />
            <div className="md:hidden ">
              {/* <Search /> */}
              <div className=" w-auto flex">
                <Search />
                <div className="w-auto px-3  mx-5 flex justify-center items-center rounded-full border-2 border-white">
                  <Filter />
                </div>
                <div className="w-auto px-3 flex justify-center items-center rounded-full border-2 border-white">
                  <OpenMap />
                </div>
              </div>
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* Desktop layout */}
      <div className="hidden md:inline-flex w-full h-[6.75rem] flex justify-center items-center">
        <div className=" w-auto flex">
          <Search />
          <div className=" w-[7.5rem] h-[3.25rem] mx-10 flex justify-center items-center rounded-lg border-2 border-black">
            <Filter />
          </div>
          <div className="w-[7.5rem] h-[3.25rem] flex justify-center items-center rounded-lg border-2 border-black">
            <OpenMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
