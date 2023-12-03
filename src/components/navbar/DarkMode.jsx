import React, { useEffect, useState } from "react";

const DarkMode = () => {
  // Change Theme Light/Dark mode with Tailwind CSS
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  //   Handle Toggle button
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      {/* Toggle darkmode button */}
      <label className="switch">
        <input type="checkbox" onClick={handleThemeSwitch} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkMode;
