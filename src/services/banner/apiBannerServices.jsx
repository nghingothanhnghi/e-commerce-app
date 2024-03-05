import { API } from "../../constants/constant";
export const fetchBanners = async () => {
    console.log('Fetching banners...');
    try {
      const response = await fetch(`${API}/banners?populate=*`, {
        method: 'GET',
      });
  
      console.log('Entire Response:', response); // Log the entire response
      const data = await response.json();
      console.log('Banner Data:', data); // Log the parsed data
      if (data?.error) {
        throw data?.error;
      } else {
        return data || [];
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      throw error?.message || 'Something went wrong while fetching banners.';
    }
  };