/* eslint-disable @typescript-eslint/no-unused-vars */

// import { useTheme } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/toaster";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

import { SearchBox } from "./SearchBox";

const HomePage = () => {
  // const { setTheme } = useTheme();

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-2 bg-white dark:bg-gray-950 max-w-6xl mx-auto pb-12 pt-2 sm:pb-24 sm:pt-2 px-">
        <div className="mt-20 flex flex-col gap-4 p-6 m-6">
          <h2 className="text-left text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] dark:bg-gradient-to-b dark:from-[#f9fafb] dark:to-[#aa6262] text-transparent dark:text-transparent bg-clip-text mt-5">
            Hey Yash, <br></br> What are we cooking today?
          </h2>
          <SearchBox></SearchBox>

          {/* Apply Tailwind or custom styles */}
          {/* <SearchResults searchedData={searchedData}></SearchResults> */}
        </div>
        <Toaster />
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
