// apiCampaignServices.jsx
import {API, BEARER } from "../../constants/constant";
import { getToken } from "../../helpers/helpers";

const baseURLUpload = "https://api.chuotgreen.com";

export const fetchCampaigns = async (locale) => {
  try {
    const response = await fetch(`${API}/campaigns?_locale=${locale}&populate=*`, {
      method: 'GET',
      // headers: {
      //   'Authorization': `${BEARER} ${getToken()}`,
      // },
    });

    console.log('Entire Response:', response); // Log the entire response
    const data = await response.json();
    console.log('Parsed Data:', data); // Log the parsed data
    if (data?.error) {
      throw data?.error;
    } else {
      return data.data || [];
    }
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error?.message || 'Something went wrong while fetching campaigns.';
  }
};

export const createCampaign = async (campaignData) => {
  try {
    const formData = new FormData();

    // // Append campaign data
    formData.append('data', JSON.stringify({
      ...campaignData,
      // Include relationships here if needed
    }));

    // // Append file data
    if (campaignData.media && campaignData.media.length > 0) {
      campaignData.media.forEach((file, index) => {
        // Append each media file with a unique key
        formData.append(`files[${index}]`, file);
      });
    }

    const response = await fetch(`${API}/campaigns`, {
      method: 'POST',
      headers: {
        'Authorization': `${BEARER} ${getToken()}`,
      },
      body: formData,
    });

    console.log('API Create Campaign Raw Response:', response);

    const data = await response.json();

    console.log('API Create Campaign Parsed Response:', data);

    if (data?.error) {
      throw new Error(data?.error);
    } else if (data?.attributes) {
      // Successfully created, return the attributes
      return data.attributes;
    } else if (data?.details) {
      // Handle validation errors
      const errorDetails = Object.values(data.details).join(', ');
      throw new Error(`Validation error: ${errorDetails}`);
    } else {
      throw new Error('Unexpected response from the server');
    }
  } catch (error) {
    console.error('Error creating campaign:', error.message);
    throw error.message || 'Something went wrong while creating campaign.';
  }
};


export const deleteCampaign = async (campaignId) => {
  try {
    const response = await fetch(`${API}/campaigns/${campaignId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (data?.error) {
      throw data?.error;
    } else {
      return data.message || 'Campaign deleted successfully';
    }
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error?.message || 'Something went wrong while deleting campaign.';
  }
};

export const editCampaign = async (campaignId, updatedCampaignData) => {
  try {
    const response = await fetch(`${baseURL}/campaigns/${campaignId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: updatedCampaignData }), // Wrap data in a "data" field
    });

    console.log('API Edit Response:', response);

    const data = await response.json();

    console.log('API Edit Response Data:', data);

    if (data?.error) {
      throw data?.error;
    } else {
      return data.data || null;
    }
  } catch (error) {
    console.error('Error editing campaign:', error);
    throw error?.message || 'Something went wrong while editing campaign.';
  }
};


export const getCampaignDetail = async (campaignId) => {
  try {
    const response = await fetch(`${API}/campaigns/${campaignId}?populate=*`, {
      method: 'GET',
      // headers: {
      //   'Authorization': `${BEARER} ${getToken()}`,
      // },
    });

    const data = await response.json();

    if (data?.error) {
      throw data?.error;
    } else {
      return data.data || null;
    }
  } catch (error) {
    console.error('Error fetching campaign detail:', error);
    throw error?.message || 'Something went wrong while fetching campaign detail.';
  }
};



export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('files', file, file.name);

    const token = getToken();
    console.log('Token:', token); // Log token for inspection

    const headers = {
      'Authorization': `${BEARER} ${token}`,
    };

    const response = await fetch(`${baseURLUpload}/uploads`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    console.log('Response:', response); // Log the entire response object

    const data = await response.json();

    if (!response.ok) {
      console.error('API Request Failed:', response.url, response.status, data);

      // Use the error message from the server or a default message
      const errorMessage = data?.message || 'Request failed with status: ' + response.status;
      throw new Error(errorMessage);
    }

    const uploadedFile = data[0];

    return uploadedFile;
  } catch (error) {
    console.error('Error uploading file to Strapi:', error);

    // Use the error message from the caught error or a default message
    const errorMessage = error.message || 'Something went wrong while uploading the file.';
    throw errorMessage;
  }
};




