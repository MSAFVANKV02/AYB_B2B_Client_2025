// src/providers/context/Context.tsx

import React, { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ScrollContextType {
  handleKycDetailsClick: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleKycDetailsClick = () => {
    const currentScrollPosition = window.scrollY; 
    navigate("/kyc/details", { state: { scrollPosition: currentScrollPosition } });
  };

  // Restore scroll position when the page loads
  useEffect(() => {
    if (location.state && location.state.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);

  return (
    <ScrollContext.Provider value={{ handleKycDetailsClick }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use the Scroll Context
export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useToggleContext must be used within a ScrollProvider");
  }
  return context;
};
