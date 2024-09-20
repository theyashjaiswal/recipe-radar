/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Radar } from "lucide-react";

export const Navbar: any = () => {
  // const { theme, toggleTheme } = props;

  return (
    <>
      <header className="fixed top-0 backdrop-blur-sm w-full h-24 text-white bg-black/90 z-20">
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <p className="text-4xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-white to-[#94959a] dark:bg-gradient-to-b dark:from-[#001E80] dark:to-white text-transparent dark:text-transparent bg-clip-text mt-5">
              Recipe Radar
            </p>
            <Radar className="h-6 w-6 " />
          </div>
          <button className="absolute right-5 hover:text-black/80 hover:border hover:rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-moon text-white"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};
