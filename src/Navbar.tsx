/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Moon, Radar, Sun } from "lucide-react";

export const Navbar: any = (props: any) => {
  const { theme, toggleTheme } = props;

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
          <button
            onClick={toggleTheme}
            className="absolute right-5 hover:text-black/80 hover:border hover:rounded-lg"
          >
            {theme === "dark" ? (
              <Sun className="text-white" />
            ) : (
              <Moon className="text-white" />
            )}
          </button>
        </div>
      </header>
    </>
  );
};
