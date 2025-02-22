import React, { useState, useEffect } from "react";
import { FaPalette } from "react-icons/fa";
import { BsSun, BsMoon, BsBrush, BsCupHot, BsDroplet } from "react-icons/bs";

const themes = [
  { name: "Light", value: "light", icon: <BsSun className="mr-2" /> },
  { name: "Dark", value: "dark", icon: <BsMoon className="mr-2" /> },
];

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "retro");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaPalette className="text-primary" /> Theme Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose your preferred theme.
        </p>
        <div className="mt-4">
          <select
            className="select select-primary w-full"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


