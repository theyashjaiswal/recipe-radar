import { Radar } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950">
      <div className="container px-6 py-8 mx-auto">
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <a href="#">
            <Radar className="h-8 w-8 mb-4 md:mb-0" />
          </a>
          <p className="text-sm text-gray-500">
            © Copyright 2024. All Rights Reserved.
          </p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Terms & Conditons{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Privacy{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Cookies{" "}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
