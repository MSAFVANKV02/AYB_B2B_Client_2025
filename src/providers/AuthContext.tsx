import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  handleLogout: (value:string) => void; // Logout function to remove user data and navigate to the login route.
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const navigate = useNavigate();


  const handleLogout = (navigator:string) => {
    localStorage.removeItem("userProfile");
    window.location.pathname=(navigator)
    Cookies.remove("us_tkn_kyc");
    setIsAuthenticated(false);
    Cookies.remove('us_b2b_tkn');
  };

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
