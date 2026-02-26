import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

const ThemeSync: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#F8FAFC";
    }
  }, [theme]);

  return null;
};

export default ThemeSync;
