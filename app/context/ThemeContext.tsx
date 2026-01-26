import React, { createContext, useContext, useState, ReactNode } from 'react';

// Theme definitions - Replace theme2 colors with your desired colors
export const themes = [
  {
    backgroundColor: "#000000",
    cardBackground: "#7a4a00",
    accentColor: "#ffd84d",
    menuBackground: "#7a4a00",
    menuText: "#ffff00",
    inputBackground: "#5a3400",  // ADDED: Dark input background
    inputText: "#ffd84d",         // ADDED: Light input text
    placeholderText: "#999", 
  },
  
  {
    backgroundColor: "#faf8f3",
    cardBackground: "#e5e5e5",    // CHANGED: Lighter gray for better contrast
    accentColor: "#000000",
    menuBackground: "#e5e5e5",    // CHANGED: Lighter gray
    menuText: "#000000",
    inputBackground: "#ffffff",   // ADDED: White input background
    inputText: "#000000",         // ADDED: Black input text
    placeholderText: "#666",
  },
];

export interface ThemeColors {
  backgroundColor: string;
  cardBackground: string;
  accentColor: string;
  menuBackground: string;
  menuText: string;
  inputBackground:string;
  inputText:string;
  placeholderText:string;
}

interface ThemeContextType {
  currentTheme: ThemeColors;
  themeIndex: number;
  toggleTheme: () => void;
  setTheme: (index: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const setTheme = (index: number) => {
    if (index >= 0 && index < themes.length) {
      setThemeIndex(index);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themes[themeIndex],
        themeIndex,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
