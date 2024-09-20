/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import { useTheme } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/toaster";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

import { SearchBox } from "./SearchBox";
import Lottie from "lottie-react";
import lightAnimationData from "./assets/food-cooking-light.json";
import darkAnimationData from "./assets/food-cooking-dark.json";

const HomePage = (props: any) => {
  const { theme, toggleTheme } = props;
  const animationData =
    theme === "dark" ? darkAnimationData : lightAnimationData;
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme}></Navbar>
      <div className="mt-2 bg-white dark:bg-gray-950 max-w-6xl mx-auto pb-12 pt-2 sm:pb-24 sm:pt-2 px-">
        <div className="mt-20 flex flex-col gap-4 p-6 m-6">
          <div className="flex flex-row gap-4">
            <h2 className="text-left text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] dark:bg-gradient-to-b dark:from-[#f9fafb] dark:to-[#aa6262] text-transparent dark:text-transparent bg-clip-text mt-5">
              Hey Yash, <br></br> What are we cooking today?
            </h2>
            <Lottie
              animationData={animationData}
              className="w-1/2 rounded-lg overflow-hidden"
            />{" "}
          </div>
          <SearchBox></SearchBox>
        </div>
        <Toaster />
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
