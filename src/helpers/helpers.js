import { AUTH_TOKEN, IMAGE_API } from "../constants/constant";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    }
  } catch (error) {
    console.error("Error setting token:", error);
    // You might want to handle this error according to your application's requirements.
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const getCurrencySymbol = (currency) => {
  return currency === "USD" ? "$" : "VND";
};

export const formatDecimal = (value, currencySymbol = "") => {
  // Convert value to a number if it's not already
  const numericValue = parseFloat(value);

  // Check if the numeric value is a valid number
  if (!isNaN(numericValue)) {
    // Format the number with commas and decimal places
    return `${currencySymbol}${numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  } else {
    return value;
  }
};


export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};



export const getImageUrl = (media, format = 'small', baseUrl = IMAGE_API) => {
  console.log("Media:", media);

  if (media && media.attributes && media.attributes.formats && media.attributes.formats[format]) {
    console.log("URL found:", baseUrl + media.attributes.formats[format].url);
    return baseUrl + media.attributes.formats[format].url;
  } else {
    console.log("Using default image URL");
    // Replace this default image URL or handle the case as needed
    return baseUrl + '/default-image.jpg';
  }
};


// Helper function to generate a random password
export const generateRandomPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }
  return password;
};




