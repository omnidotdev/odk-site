import { Button } from "@omnidotdev/thornberry/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { useTheme } from "@/providers/ThemeProvider";

/**
 * Theme toggle. Bound to the `t` shortcut, matching the Omni app convention.
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // `t` flips the theme from anywhere on the page (ignored while typing)
  useHotkeys("t", toggleTheme, { preventDefault: true }, [theme]);

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode (press t)`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ThemeToggle;
