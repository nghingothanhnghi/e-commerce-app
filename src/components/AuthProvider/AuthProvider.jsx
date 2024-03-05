/// AuthProvider.jsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BEARER } from "../../constants/constant";
import { USER_TYPES } from "../../constants/userTypes";
import { getToken } from "../../helpers/helpers";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(); // Add userType state

  const authToken = getToken();

  const fetchLoggedInUser = async (token, userType) => {
    setIsLoading(true);
    try {

      let baseURL;
      let endpoint;

      // Check user type and environment
      switch (userType) {
        case USER_TYPES.ADMIN:
          baseURL = 'https://api.chuotgreen.com';
          endpoint = '/api/users/me';
          break;
          case USER_TYPES.ADVERTISER:
          baseURL = window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://api.chuotgreen.com';
          endpoint = '/api/users/me'; /// change the real api when access success
          break;
          case USER_TYPES.PUBLISHER:
          baseURL = 'https://api.chuotgreen.com';
          endpoint = '/api/users/me'; /// change the real api when access success
          break;
        default:
          baseURL = 'https://api.chuotgreen.com';
          endpoint = '/api/users/me'; 
          break;
      }

      const response = await fetch(`${baseURL}${endpoint}`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the error text from the server
        throw new Error(`Failed to fetch user data: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      setUserData(data);
      // Assume that the user type is available in the user data, adjust accordingly
      setUserType(data?.userType || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleUser = (user) => {
    setUserData(user);
    // Assume that the user type is available in the user data, adjust accordingly
    setUserType(user?.userType || "");
  };

  useEffect(() => {
    console.log("authToken:", authToken);
    console.log("userType:", userType);
    if (authToken && userType !== null && !isLoading) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading, userType }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
