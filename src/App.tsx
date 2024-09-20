/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ThemeProvider } from "../src/components/ui/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFound";
import RecipeDetailPage from "./RecipeDetailPage";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return (
      (localStorage.getItem("vite-ui-theme") as "light" | "dark") ||
      systemPreference
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("vite-ui-theme", theme);
  }, [theme]);

  function toggleTheme() {
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
