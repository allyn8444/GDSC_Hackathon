import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ContractProps {
  onCreateReservation: () => void;
  visible: boolean;
}

const Contract: React.FC<ContractProps> = ({
  onCreateReservation,
  visible,
}) => {
  const [isVisible, setIsVisible] = useState(visible); // Set initial visibility to false

  const handleClose = () => {
    setIsVisible(false);
    visible = false;
  };

  const handleContinue = () => {
    onCreateReservation(); // Call the onCreateReservation function passed as prop
    handleClose(); // Close the container
  };

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center z-10 bg-white">
          <div className=" w-full h-[90vh] bg-[#10a37f] flex items-center justify-center">
            <button
              className="
                p-1
                border-0 
                hover:opacity-70
                transition
                absolute
                right-10
                lg:right-40
                
                top-9
                bg-black
                rounded-full
              "
              onClick={handleClose}
            >
              <IoMdClose size={40} />
            </button>
            {/* Content */}

            <div className="w-[80%] md:w-[50rem] h-full ">
              <iframe
                src="https://docs.google.com/document/d/e/2PACX-1vSkQlYLC8B2MYZn70ord3lqLJ8X_lYJYtTPJ2-UCDqGPiT5HNSErHDYC6Y5gRYWB5zoV0Z477OHq5zj/pub?embedded=true"
                width="100%"
                height="100%"
                className=""
              />
            </div>
          </div>
          <div className="border-t-2 border-[#10a37f] flex  w-full justify-center items-center">
            <p className="flex justify-center items-center text-black">
              1. Click the &#34;Download&#34; button to save the form to your
              device.
              {/* <IoMdClose size={18} /> import { IoMdClose } from "react-icons/io"; */}
              <br />
              2. Open the downloaded form and fill it out with your information.
            </p>
            <div className="w-[8rem] m-4">
              <Button
                label="Download"
                onClick={() => {
                  window.open(
                    "https://docs.google.com/document/d/1e2c99FBPoBKP5sdH38pXMNk5kutps5ZMzOi3hkLgArs/export?format=docx",
                    "_blank"
                  );
                }}
              />
            </div>
            <div className="w-[8rem] m-4">
              <Button label="Reserve" onClick={handleContinue} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contract;
