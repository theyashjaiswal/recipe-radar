/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import axios from "axios";
import debounce from "lodash/debounce";

import { Button } from "./components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Card } from "./components/ui/card";
import { useToast } from "./hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import chefIcon from "./assets/chef.svg"; // Adjust the path as necessary

const API_KEY = import.meta.env.VITE_API_KEY;

// const data: Recipe[] = [
//   {
//     id: 715415,
//     title: "Red Lentil Soup with Chicken and Turnips",
//     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 716406,
//     title: "Asparagus and Pea Soup: Real Convenience Food",
//     image: "https://img.spoonacular.com/recipes/716406-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 644387,
//     title: "Garlicky Kale",
//     image: "https://img.spoonacular.com/recipes/644387-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 715446,
//     title: "Slow Cooker Beef Stew",
//     image: "https://img.spoonacular.com/recipes/715446-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 782601,
//     title: "Red Kidney Bean Jambalaya",
//     image: "https://img.spoonacular.com/recipes/782601-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 716426,
//     title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
//     image: "https://img.spoonacular.com/recipes/716426-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 716004,
//     title:
//       "Quinoa and Chickpea Salad with Sun-Dried Tomatoes and Dried Cherries",
//     image: "https://img.spoonacular.com/recipes/716004-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 716627,
//     title: "Easy Homemade Rice and Beans",
//     image: "https://img.spoonacular.com/recipes/716627-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 664147,
//     title: "Tuscan White Bean Soup with Olive Oil and Rosemary",
//     image: "https://img.spoonacular.com/recipes/664147-312x231.jpg",
//     imageType: "jpg",
//   },
//   {
//     id: 640941,
//     title: "Crunchy Brussels Sprouts Side Dish",
//     image: "https://img.spoonacular.com/recipes/640941-312x231.jpg",
//     imageType: "jpg",
//   },
// ];

export type Stream = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  songName: string;
  artist?: string;
  dateStreamed?: string;
  streamCount: number;
  albumCover?: string;
};

// interface Recipe {
//   id: number;
//   title: string;
//   image: string;
//   imageType: string;
// }
const cuisines = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

export function SearchBox() {
  const [open, setOpen] = React.useState(false);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [originalRecipesResponse, setOriginalRecipesResponse] =
    React.useState(null);

  const [value, setValue] = React.useState("");
  const [pageSize, setPageSize] = React.useState(5);
  const { toast } = useToast();
  const [selectedCuisines, setSelectedCuisines] = React.useState<string[]>([]);

  const [offSet, setOffSet] = React.useState(0);

  const navigate = useNavigate();

  // Debounced API call function
  const fetchRecipesDebounce = React.useCallback(
    debounce(async (query: string, pSize: number, pOffSet: number) => {
      if (!query.trim()) {
        setRecipes([]);
        return;
      }

      console.log(console.log("hi22"));

      const cuisinesString = selectedCuisines.join(",");
      console.log("cuisinesString", cuisinesString);
      try {
        const response = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch",
          {
            params: {
              apiKey: API_KEY,
              query: query,
              number: pSize, // Number of results per page
              offset: pOffSet,
              cuisine: cuisinesString,
            },
          }
        );
        // const response = {
        //   data: {
        //     results: [
        //       {
        //         id: 644953,
        //         title: "Goat Cheese Pesto Pizza",
        //         image: "https://img.spoonacular.com/recipes/644953-312x231.jpg",
        //         imageType: "jpg",
        //       },
        //       {
        //         id: 642777,
        //         title: "Fig and Goat Cheese Pizza With Pesto",
        //         image: "https://img.spoonacular.com/recipes/642777-312x231.jpg",
        //         imageType: "jpg",
        //       },
        //       {
        //         id: 647124,
        //         title: "Homemade Thin Crust Pizza + Pesto + Potato",
        //         image: "https://img.spoonacular.com/recipes/647124-312x231.jpg",
        //         imageType: "jpg",
        //       },
        //       {
        //         id: 652592,
        //         title: "Multigrain Tandoori Pizza With Paneer Tikka",
        //         image: "https://img.spoonacular.com/recipes/652592-312x231.jpg",
        //         imageType: "jpg",
        //       },
        //       {
        //         id: 642371,
        //         title:
        //           "Elk Italian Sausage Pizza With Ricotta Cheese, Sautéd Mushrooms and Onion",
        //         image: "https://img.spoonacular.com/recipes/642371-312x231.jpg",
        //         imageType: "jpg",
        //       },
        //     ],
        //     offset: 15,
        //     number: 5,
        //     totalResults: 38,
        //   },
        // };
        setOriginalRecipesResponse(response.data);
        setRecipes(response.data.results);
      } catch (err) {
        // setRecipes(data);
        // for local testing
        toast({
          variant: "destructive",
          title: "An error occurred while fetching recipes.",
          description: err?.message,
        });
        // setError("An error occurred while fetching recipes.");
      } finally {
        // setLoading(false);
      }
    }, 300), // Debounce delay in milliseconds
    []
  );

  const fetchRecipes = async (
    query: string,
    pSize: number,
    pOffSet: number
  ) => {
    const cuisinesString = selectedCuisines.join(",");
    console.log("cuisinesString", cuisinesString);
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            apiKey: API_KEY,
            query: query,
            number: pSize, // Number of results per page
            offset: pOffSet,
            cuisine: cuisinesString,
          },
        }
      );
      // const response = {
      //   data: {
      //     results: [
      //       {
      //         id: 644953,
      //         title: "Goat Cheese Pesto Pizza",
      //         image: "https://img.spoonacular.com/recipes/644953-312x231.jpg",
      //         imageType: "jpg",
      //       },
      //       {
      //         id: 642777,
      //         title: "Fig and Goat Cheese Pizza With Pesto",
      //         image: "https://img.spoonacular.com/recipes/642777-312x231.jpg",
      //         imageType: "jpg",
      //       },
      //       {
      //         id: 647124,
      //         title: "Homemade Thin Crust Pizza + Pesto + Potato",
      //         image: "https://img.spoonacular.com/recipes/647124-312x231.jpg",
      //         imageType: "jpg",
      //       },
      //       {
      //         id: 652592,
      //         title: "Multigrain Tandoori Pizza With Paneer Tikka",
      //         image: "https://img.spoonacular.com/recipes/652592-312x231.jpg",
      //         imageType: "jpg",
      //       },
      //       {
      //         id: 642371,
      //         title:
      //           "Elk Italian Sausage Pizza With Ricotta Cheese, Sautéd Mushrooms and Onion",
      //         image: "https://img.spoonacular.com/recipes/642371-312x231.jpg",
      //         imageType: "jpg",
      //       },
      //     ],
      //     offset: 15,
      //     number: 5,
      //     totalResults: 38,
      //   },
      // };
      setOriginalRecipesResponse(response.data);
      setRecipes(response.data.results);
      // setSearchedData(response.data.results);

      // setError(null);
    } catch (err) {
      // setRecipes(data);
      // for local testing
      toast({
        variant: "destructive",
        title: "An error occurred while fetching recipes.",
        description: err?.message,
      });
      // setError("An error occurred while fetching recipes.");
    } finally {
      // setLoading(false);
    }
  };

  const handleCheckboxChange = (cuisine: string) => {
    setSelectedCuisines((prevState) =>
      prevState.includes(cuisine)
        ? prevState.filter((item) => item !== cuisine)
        : [...prevState, cuisine]
    );
    fetchRecipes(value, pageSize, offSet);
    console.log(selectedCuisines, "selectedCusines");
  };

  // Handle input change and debounce the API call
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    fetchRecipes(newValue, pageSize, offSet);
  };

  const handlePageSizeChange = (size, pOffSet) => {
    setPageSize(size);
    setOffSet(0); // Reset offset to 0
    pOffSet = 0;
    fetchRecipes(value, size, pOffSet); // Fetch recipes with the new page size and reset offset
  };

  const nextLogic = (pSize, pOffSet) => {
    // Check if there are more recipes to load

    setOffSet(pSize + pOffSet);
    fetchRecipes(value, pSize, pSize + pOffSet);
    console.log("next", pSize, pOffSet);
  };

  const prevLogic = (pSize: number, pOffSet: number) => {
    // Ensure offset does not go below zero
    // if (pOffSet - pSize < 0) {
    //   return; // or set offset to 0
    // }

    // Decrement offset and fetch recipes
    setOffSet(pOffSet - pSize);
    fetchRecipes(value, pSize, pOffSet - pSize);
  };

  // Handle key press to open the popover
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setOpen(!open);
    }
  };

  const getCurrentPageNumber = (offset, pageSize) => {
    return Math.floor(offset / pageSize) + 1;
  };

  React.useEffect(() => {
    // Clean up debounce function on component unmount
    return () => {
      fetchRecipesDebounce.cancel();
    };
  }, [fetchRecipesDebounce]);

  return (
    <>
      <div className="flex justify-between py-4 gap-4">
        <div className="relative justify-center w-5/6">
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
            className="top-4 lucide lucide-search absolute left-2.5 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="search"
            className="shadow-lg flex h-12 border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background pl-8 "
            placeholder="Search Recipes..."
            jf-ext-cache-id="0"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="left-[200px] h-12 
            "
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 mr-2 h-4 w-4"
              >
                <path
                  d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-h-[400px] overflow-y-scroll">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Cuisines</h4>
                <p className="text-sm text-muted-foreground">
                  Select your preferred cuisines.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {cuisines.map((cuisine, index) => (
                  <div key={cuisine} className="flex items-center gap-2">
                    <Checkbox
                      id={cuisine + " " + index}
                      checked={selectedCuisines.includes(cuisine)}
                      onCheckedChange={() => handleCheckboxChange(cuisine)}
                    />

                    <Label
                      htmlFor={cuisine + " " + index}
                      text-sm
                      font-medium
                      leading-none
                      peer-disabled:cursor-not-allowed
                      peer-disabled:opacity-70
                    >
                      {cuisine}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {value.trim() === "" && selectedCuisines.length == 0 ? (
        <div className="flex  flex-col justify-center items-center">
          <p className="text-2xl md:text-md md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] dark:bg-gradient-to-b dark:from-[#8e95ae] dark:to-white text-transparent dark:text-transparent bg-clip-text mt-2">
            Start typing to discover some delicious options!
          </p>
          <img src={chefIcon} alt="Chef Icon" className="w-96 " />{" "}
        </div>
      ) : (
        <Card className="h-fit p-6 overflow-scroll">
          <div className="flex flex-wrap gap-4">
            {recipes.map((recipe) => {
              return (
                <div
                  key={recipe?.id}
                  className="shadow-2xl mx-auto mt-11 w-80 lg:w-96 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 duration-300 hover:scale-105 hover:shadow-lg"
                  // style={{ boxShadow: "0px 4px 25px grey" }}
                  onClick={() => {
                    navigate(`/recipeDetailPage/${recipe?.id}`);
                  }}
                >
                  <img
                    className="h-48 w-full object-cover object-center"
                    src={recipe.image}
                    alt="Recipe Image"
                  />
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                      {recipe.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
          {recipes.length === 0 && (
            <div className="flex  flex-col justify-center items-center">
              <p className="flex items-center gap-2 ">
                <span className="text-2xl md:text-md md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] dark:bg-gradient-to-b dark:from-[#001E80] dark:to-white text-transparent dark:text-transparent bg-clip-text mt-2">
                  No Results Found, Try searching for Pizza !
                </span>
                <span className="bg-clip-border"> 🍕 </span>
              </p>
              <img src={chefIcon} alt="Chef Icon" className="w-96 " />{" "}
            </div>
          )}

          {/* Pagination controls */}
          {recipes.length !== 0 && (
            <>
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  {/* Page {table.getState().pagination.pageIndex + 1} of{" "} */}
                  {/* {table.getPageCount()} */}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => prevLogic(pageSize, offSet)}
                    disabled={offSet - pageSize < 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      nextLogic(pageSize, offSet);
                    }}
                    disabled={
                      offSet + pageSize >= originalRecipesResponse?.totalResults
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div className="flex justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Page {getCurrentPageNumber(offSet, pageSize)} of{" "}
                  {Math.ceil(
                    Number(originalRecipesResponse?.totalResults) / pageSize
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Items per page:
                      {/*  {table.getState().pagination.pageSize} */}
                      {pageSize}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {[5, 10, 20, 50].map((size) => (
                      <DropdownMenuItem
                        key={size}
                        onSelect={() => handlePageSizeChange(size, offSet)}
                        className={`capitalize ${
                          pageSize === size ? "font-bold" : ""
                        }`}
                      >
                        {size}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}
