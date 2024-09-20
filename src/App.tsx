/* eslint-disable @typescript-eslint/no-unused-vars */

import { ThemeProvider } from "../src/components/ui/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFound";
import RecipeDetailPage from "./RecipeDetailPage";

function App() {
  // const [showSidebar, onSetShowSidebar] = useState(false);
  // const { setTheme } = useTheme();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipeDetailPage/:id" element={<RecipeDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
