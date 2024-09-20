/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  ChevronLeft,
  Copy,
  LeafyGreen,
  MilkOff,
  MoreVertical,
  Vegan,
  WheatOff,
} from "lucide-react";
import { Separator } from "./components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";
import axios from "axios";
import DOMPurify from "dompurify";

import milkIcon from "./assets/dairy-free.png"; // Adjust path to your image
import vegIcon from "./assets/leaf.png"; // Adjust path to your image file
import { Navbar } from "./Navbar";

// const recipeDetailsMock = {
//   id: 716429,
//   title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
//   image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
//   imageType: "jpg",
//   servings: 2,
//   readyInMinutes: 45,
//   cookingMinutes: 25,
//   preparationMinutes: 20,
//   license: "CC BY-SA 3.0",
//   sourceName: "Full Belly Sisters",
//   sourceUrl:
//     "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
//   spoonacularSourceUrl:
//     "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
//   healthScore: 19.0,
//   spoonacularScore: 83.0,
//   pricePerServing: 163.15,
//   analyzedInstructions: [],
//   cheap: false,
//   creditsText: "Full Belly Sisters",
//   cuisines: [],
//   dairyFree: false,
//   diets: [],
//   gaps: "no",
//   glutenFree: true,
//   instructions: "",
//   ketogenic: false,
//   lowFodmap: false,
//   occasions: [],
//   sustainable: false,
//   vegan: false,
//   vegetarian: false,
//   veryHealthy: false,
//   veryPopular: true,
//   whole30: false,
//   weightWatcherSmartPoints: 17,
//   dishTypes: ["lunch", "main course", "main dish", "dinner"],
//   extendedIngredients: [
//     {
//       aisle: "Milk, Eggs, Other Dairy",
//       amount: 1.0,
//       consistency: "solid",
//       id: 1001,
//       image: "butter-sliced.jpg",
//       measures: {
//         metric: {
//           amount: 1.0,
//           unitLong: "Tbsp",
//           unitShort: "Tbsp",
//         },
//         us: {
//           amount: 1.0,
//           unitLong: "Tbsp",
//           unitShort: "Tbsp",
//         },
//       },
//       meta: [],
//       name: "butter",
//       original: "1 tbsp butter",
//       originalName: "butter",
//       unit: "tbsp",
//     },
//     {
//       aisle: "Produce",
//       amount: 2.0,
//       consistency: "solid",
//       id: 10011135,
//       image: "cauliflower.jpg",
//       measures: {
//         metric: {
//           amount: 473.176,
//           unitLong: "milliliters",
//           unitShort: "ml",
//         },
//         us: {
//           amount: 2.0,
//           unitLong: "cups",
//           unitShort: "cups",
//         },
//       },
//       meta: ["frozen", "thawed", "cut into bite-sized pieces"],
//       name: "cauliflower florets",
//       original:
//         "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
//       originalName:
//         "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
//       unit: "cups",
//     },
//     {
//       aisle: "Cheese",
//       amount: 2.0,
//       consistency: "solid",
//       id: 1041009,
//       image: "cheddar-cheese.png",
//       measures: {
//         metric: {
//           amount: 2.0,
//           unitLong: "Tbsps",
//           unitShort: "Tbsps",
//         },
//         us: {
//           amount: 2.0,
//           unitLong: "Tbsps",
//           unitShort: "Tbsps",
//         },
//       },
//       meta: ["grated", "(I used romano)"],
//       name: "cheese",
//       original: "2 tbsp grated cheese (I used romano)",
//       originalName: "grated cheese (I used romano)",
//       unit: "tbsp",
//     },
//     {
//       aisle: "Oil, Vinegar, Salad Dressing",
//       amount: 1.0,
//       consistency: "liquid",
//       id: 1034053,
//       image: "olive-oil.jpg",
//       measures: {
//         metric: {
//           amount: 1.0,
//           unitLong: "Tbsp",
//           unitShort: "Tbsp",
//         },
//         us: {
//           amount: 1.0,
//           unitLong: "Tbsp",
//           unitShort: "Tbsp",
//         },
//       },
//       meta: [],
//       name: "extra virgin olive oil",
//       original: "1-2 tbsp extra virgin olive oil",
//       originalName: "extra virgin olive oil",
//       unit: "tbsp",
//     },
//     {
//       aisle: "Produce",
//       amount: 5.0,
//       consistency: "solid",
//       id: 11215,
//       image: "garlic.jpg",
//       measures: {
//         metric: {
//           amount: 5.0,
//           unitLong: "cloves",
//           unitShort: "cloves",
//         },
//         us: {
//           amount: 5.0,
//           unitLong: "cloves",
//           unitShort: "cloves",
//         },
//       },
//       meta: [],
//       name: "garlic",
//       original: "5-6 cloves garlic",
//       originalName: "garlic",
//       unit: "cloves",
//     },
//     {
//       aisle: "Pasta and Rice",
//       amount: 6.0,
//       consistency: "solid",
//       id: 20420,
//       image: "fusilli.jpg",
//       measures: {
//         metric: {
//           amount: 170.097,
//           unitLong: "grams",
//           unitShort: "g",
//         },
//         us: {
//           amount: 6.0,
//           unitLong: "ounces",
//           unitShort: "oz",
//         },
//       },
//       meta: ["(I used linguine)"],
//       name: "pasta",
//       original: "6-8 ounces pasta (I used linguine)",
//       originalName: "pasta (I used linguine)",
//       unit: "ounces",
//     },
//     {
//       aisle: "Spices and Seasonings",
//       amount: 2.0,
//       consistency: "solid",
//       id: 1032009,
//       image: "red-pepper-flakes.jpg",
//       measures: {
//         metric: {
//           amount: 2.0,
//           unitLong: "pinches",
//           unitShort: "pinches",
//         },
//         us: {
//           amount: 2.0,
//           unitLong: "pinches",
//           unitShort: "pinches",
//         },
//       },
//       meta: ["red"],
//       name: "red pepper flakes",
//       original: "couple of pinches red pepper flakes, optional",
//       originalName: "couple of red pepper flakes, optional",
//       unit: "pinches",
//     },
//     {
//       aisle: "Spices and Seasonings",
//       amount: 2.0,
//       consistency: "solid",
//       id: 1102047,
//       image: "salt-and-pepper.jpg",
//       measures: {
//         metric: {
//           amount: 2.0,
//           unitLong: "servings",
//           unitShort: "servings",
//         },
//         us: {
//           amount: 2.0,
//           unitLong: "servings",
//           unitShort: "servings",
//         },
//       },
//       meta: ["to taste"],
//       name: "salt and pepper",
//       original: "salt and pepper, to taste",
//       originalName: "salt and pepper, to taste",
//       unit: "servings",
//     },
//     {
//       aisle: "Produce",
//       amount: 3.0,
//       consistency: "solid",
//       id: 11291,
//       image: "spring-onions.jpg",
//       measures: {
//         metric: {
//           amount: 3.0,
//           unitLong: "",
//           unitShort: "",
//         },
//         us: {
//           amount: 3.0,
//           unitLong: "",
//           unitShort: "",
//         },
//       },
//       meta: ["white", "green", "separated", "chopped"],
//       name: "scallions",
//       original: "3 scallions, chopped, white and green parts separated",
//       originalName: "scallions, chopped, white and green parts separated",
//       unit: "",
//     },
//     {
//       aisle: "Alcoholic Beverages",
//       amount: 2.0,
//       consistency: "liquid",
//       id: 14106,
//       image: "white-wine.jpg",
//       measures: {
//         metric: {
//           amount: 2.0,
//           unitLong: "Tbsps",
//           unitShort: "Tbsps",
//         },
//         us: {
//           amount: 2.0,
//           unitLong: "Tbsps",
//           unitShort: "Tbsps",
//         },
//       },
//       meta: ["white"],
//       name: "white wine",
//       original: "2-3 tbsp white wine",
//       originalName: "white wine",
//       unit: "tbsp",
//     },
//     {
//       aisle: "Pasta and Rice",
//       amount: 0.25,
//       consistency: "solid",
//       id: 99025,
//       image: "breadcrumbs.jpg",
//       measures: {
//         metric: {
//           amount: 59.147,
//           unitLong: "milliliters",
//           unitShort: "ml",
//         },
//         us: {
//           amount: 0.25,
//           unitLong: "cups",
//           unitShort: "cups",
//         },
//       },
//       meta: ["whole wheat", "(I used panko)"],
//       name: "whole wheat bread crumbs",
//       original: "1/4 cup whole wheat bread crumbs (I used panko)",
//       originalName: "whole wheat bread crumbs (I used panko)",
//       unit: "cup",
//     },
//   ],
//   summary:
//     'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375">Cauliflower Gratin with Garlic Breadcrumbs</a>, < href="https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.',
//   winePairing: {
//     pairedWines: ["chardonnay", "gruener veltliner", "sauvignon blanc"],
//     pairingText:
//       "Chardonnay, Gruener Veltliner, and Sauvignon Blanc are great choices for Pasta. Sauvignon Blanc and Gruner Veltliner both have herby notes that complement salads with enough acid to match tart vinaigrettes, while a Chardonnay can be a good pick for creamy salad dressings. The Buddha Kat Winery Chardonnay with a 4 out of 5 star rating seems like a good match. It costs about 25 dollars per bottle.",
//     productMatches: [
//       {
//         id: 469199,
//         title: "Buddha Kat Winery Chardonnay",
//         description:
//           "We barrel ferment our Chardonnay and age it in a mix of Oak and Stainless. Giving this light bodied wine modest oak character, a delicate floral aroma, and a warming finish.",
//         price: "$25.0",
//         imageUrl: "https://img.spoonacular.com/products/469199-312x231.jpg",
//         averageRating: 0.8,
//         ratingCount: 1.0,
//         score: 0.55,
//         link: "https://www.amazon.com/2015-Buddha-Kat-Winery-Chardonnay/dp/B00OSAVVM4?tag=spoonacular-20",
//       },
//     ],
//   },
// };

const yesNo = (val) => {
  return val === true ? "Yes" : "No";
};

const API_KEY = import.meta.env.VITE_API_KEY;

function RecipeDetailPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const contentRef = useRef();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  const getTextToCopy = (contentRef) => {
    const textToCopy = contentRef?.current?.innerText;
    return textToCopy;
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // setRecipeDetails(recipeDetailsMock);
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: API_KEY,
            },
          }
        );
        setRecipeDetails(response.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const sanitize = (val) => {
    let sanitizedHtml;
    try {
      sanitizedHtml = DOMPurify.sanitize(val); // Sanitize the HTML
    } catch {
      console.log("error sanitizing");
    }
    return sanitizedHtml;
  };

  function convertMinsToHoursAndMins(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60); // Get the number of full hours
    const minutes = totalMinutes % 60; // Get the remaining minutes

    // Construct the result with the correct pluralization
    const hoursDisplay =
      hours > 0 ? `${hours} hour${hours === 1 ? "" : "s"}` : "";
    const minutesDisplay =
      minutes > 0 ? `${minutes} minute${minutes === 1 ? "" : "s"}` : "";

    // Return combined result, ensuring no extra spaces or conjunctions
    if (hoursDisplay && minutesDisplay) {
      return `${hoursDisplay} and ${minutesDisplay}`;
    } else {
      return hoursDisplay || minutesDisplay; // Return whichever is non-empty
    }
  }

  return (
    <>
      {recipeDetails ? (
        <>
          <Navbar></Navbar>
          <div className="mt-24 bg-white dark:bg-gray-950 max-w-6xl mx-auto pb-12 pt-2 sm:pb-24 sm:pt-2 px-6">
            <div className="flex flex-col justify-center">
              <p className="text-4xl font-semibold">Recipe Details</p>
              <Card className="overflow-hidden mt-4" ref={contentRef}>
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <ChevronLeft
                    className="self-center mr-4 "
                    onClick={() => navigate("/")}
                  />
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {recipeDetails.title}
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    {/* <CardDescription>
               
                </CardDescription> */}
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Track Order
                  </span>
                </Button> */}
                    {recipeDetails.veryPopular ? (
                      <div className="inline-flex self-end items-center text-sm rounded-xl px-4 py-1.5 border border-gray-800 dark:invert">
                        <motion.span
                          className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                          animate={{ backgroundPositionX: "100%" }}
                          transition={{
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                            duration: 1.2,
                          }}
                        >
                          Popular
                        </motion.span>
                      </div>
                    ) : null}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(
                              JSON.stringify(getTextToCopy(contentRef))
                            );
                            toast({
                              title: "Reciepe Details Copied",
                              description:
                                "The Reciepe Details has been copied to your clipboard.",
                            });
                          }}
                        >
                          Copy Recipe Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <img
                      src={recipeDetails.image}
                      className="object-contain rounded-lg hover:scale-105 hover:ease-in-out hover:duration-100"
                    />
                    <div className="font-semibold">Health Information</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="flex text-md gap-2 items-center text-gray-600">
                          <Vegan className="h-5 w-5" />
                          Vegan
                          {/* <span className="text-muted-foreground">
                        {yesNo(recipeDetails.vegan)}
                      </span> */}
                        </span>
                        {/* <span>$250.00</span> */}{" "}
                        {yesNo(recipeDetails.vegan)}
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex  gap-2 items-center text-gray-600">
                          <MilkOff className="h-5 w-5" />
                          Dairy-Free
                          {/* <span>{yesNo(recipeDetails.dairyFree)}</span> */}
                        </span>
                        <span> {yesNo(recipeDetails.vegan)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex  gap-2 items-center text-gray-600">
                          <LeafyGreen className="h-5 w-5" />
                          Vegetarian
                        </span>
                        <span> {yesNo(recipeDetails.vegan)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex  gap-2 items-center text-gray-600">
                          <WheatOff className="h-5 w-5" />
                          Glutten-Free
                        </span>
                        <span> {yesNo(recipeDetails.glutenFree)}</span>
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <div className="font-semibold">List of Ingridients</div>
                    <ul className="grid gap-3">
                      {recipeDetails.extendedIngredients.map((recipeDetail) => (
                        <li className="flex lg:items-center justify-between">
                          <span className="text-gray-600 capitalize">
                            {recipeDetail.name}
                          </span>
                          <span>
                            {recipeDetail.measures.metric.amount +
                              " " +
                              recipeDetail.measures.metric.unitShort}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {recipeDetails.instructions.trim() !== "" ? (
                    <>
                      <Separator className="my-4" />
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <div className="font-semibold">
                            Cooking Instructions
                          </div>
                          <address className=" gap-0.5 not-italic text-muted-foreground">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sanitize(recipeDetails.instructions),
                              }}
                            ></span>
                          </address>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Additional Information</div>
                    <dl className="grid gap-3">
                      {recipeDetails.preparationMinutes &&
                      recipeDetails.preparationMinutes?.toString().trim() !==
                        "" ? (
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            Preparation Time
                          </dt>
                          <dd>
                            {convertMinsToHoursAndMins(
                              recipeDetails.preparationMinutes
                            )}
                          </dd>
                        </div>
                      ) : null}

                      {recipeDetails.cookingMinutes &&
                      recipeDetails.cookingMinutes?.toString().trim() !== "" ? (
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            Cooking Time
                          </dt>
                          <dd>
                            {convertMinsToHoursAndMins(
                              recipeDetails.cookingMinutes
                            )}
                          </dd>
                        </div>
                      ) : null}

                      {recipeDetails.cookingMinutes &&
                      recipeDetails.cookingMinutes?.toString().trim() !== "" ? (
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            Total Time
                          </dt>
                          <dd>
                            {convertMinsToHoursAndMins(
                              (recipeDetails.preparationMinutes || 0) +
                                recipeDetails.cookingMinutes
                            )}
                          </dd>
                        </div>
                      ) : null}
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          Servings
                        </dt>
                        <dd>{recipeDetails.servings}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          Price Per Serving
                        </dt>
                        <dd>{recipeDetails.pricePerServing.toFixed(2)}$</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          Source
                        </dt>
                        <dd
                          className="underline hover:cursor-pointer text-blue-700"
                          onClick={() => {
                            window.open(recipeDetails.sourceUrl);
                          }}
                        >
                          <a href={recipeDetails.sourceUrl}></a>
                          {recipeDetails.sourceName}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">{recipeDetails.}</time>
              </div>
            </CardFooter> */}
              </Card>
            </div>
            <Toaster />
          </div>
        </>
      ) : null}
    </>
  );
}

export default RecipeDetailPage;
