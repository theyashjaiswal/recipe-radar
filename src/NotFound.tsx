// src/pages/NotFoundPage.jsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  });

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px" }}
      className="text-black dark:text-white"
    >
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Redirecting back to the homepage in a few seconds...</Link>
    </div>
  );
};

export default NotFoundPage;
