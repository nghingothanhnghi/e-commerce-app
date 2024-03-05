// apiAdvertiserServices.jsx
import { setToken } from "../../helpers/helpers";
import { USER_TYPES } from "../../constants/userTypes";
import { API, AUTH_ENDPOINTS } from "../../constants/constant";

export const signInAdvertiser = async (email, password, userType) => {
  try {
    
    const endpoint = determineAdvertisterEndpoint(userType);

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

export const signUpAdvertiser = async (username, email, password) => {
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

export const forgotPasswordAdvertiser = async (email) => {
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

const determineAdvertisterEndpoint = (userType) => {
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


