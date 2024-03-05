// apiAdminServices.js
import { setToken, getToken } from "../../helpers/helpers";
import { USER_TYPES } from "../../constants/userTypes";
import { API, BEARER , AUTH_ENDPOINTS } from "../../constants/constant";

export const signInAdmin = async (email, password, userType) => {
  try {

    const endpoint = determineAdminEndpoint(userType);
    const response = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password }),
    });

    const data = await response.json();

    if (data?.error) {
      throw data?.error;
    } else {
      setToken(data.jwt);
      // Log the user type
      console.log("User type:", data.user?.userType);
      return data.user;
    }
  } catch (error) {
    console.error(`Error during sign-in:`, error);
    throw error?.message || "Something went wrong!";
  }
};

export const signUpAdmin = async (username, email, password) => {
  try {
    const response = await fetch(`${API}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data?.error) {
      throw data?.error;
    } else {
      setToken(data.jwt);
      return data.user;
    }
  } catch (error) {
    console.error(`Error during admin registration:`, error);
    throw error?.message || "Something went wrong!";
  }
};

export const forgotPasswordAdmin = async (email) => {
  try {
    const endpoint = AUTH_ENDPOINTS.ADMIN; // Assuming you want to use the admin endpoint for forgot password
    const response = await fetch(`${API}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data?.error) {
      throw data?.error;
    } else {
      setToken(data.jwt);
      return data.user;
    }
  } catch (error) {
    console.error(`Error during admin forgot password:`, error);
    throw error?.message || "Something went wrong!";
  }
};

export const fetchUsersList = async () => {
  try {
    // Ensure the user is authenticated and retrieve the JWT token
    const token = getToken();
    if (!token) {
      throw new Error("User not authenticated");
    }

    // Make the API request to fetch the user list
    const response = await fetch(`${API}/users?populate=*`, {
      headers: {
        Authorization: `${BEARER} ${token}`,
      },
    });

    const data = await response.json();
    console.log("Parsed Data:", data); // Log the parsed data
    return data;
  } catch (error) {
    console.error("Error fetching user list:", error.message);
    throw error;
  }
};

const determineAdminEndpoint = (userType) => {
  switch (userType) {
    case USER_TYPES.ADVERTISER:
      return AUTH_ENDPOINTS.ADVERTISER;
    case USER_TYPES.PUBLISHER:
      return AUTH_ENDPOINTS.PUBLISHER;
    case USER_TYPES.ADMIN:
    default:
      return AUTH_ENDPOINTS.ADMIN;
  }
};