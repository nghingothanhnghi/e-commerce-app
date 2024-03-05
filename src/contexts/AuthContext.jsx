import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: undefined, // Current user information
  isLoading: false, // Loading state for async operations
  setUser: () => {},  // Function to update the user information
  userType: undefined,     // User type information
});

export const useAuthContext = () => useContext(AuthContext);
