/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ThemeProvider } from "../src/components/ui/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFound";
import RecipeDetailPage from "./RecipeDetailPage";
import { useEffect, useState } from "react";

function App() {
  // const [showSidebar, onSetShowSidebar] = useState(false);
  // const { setTheme } = useTheme();
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme(_theme: any) {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage theme={theme} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/recipeDetailPage/:id"
            element={
              <RecipeDetailPage theme={theme} toggleTheme={toggleTheme} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
