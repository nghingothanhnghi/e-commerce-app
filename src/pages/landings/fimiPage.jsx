import React, { useState, useEffect } from "react";
import HeroBannerHome from "../../components/HeroBannerHome/HeroBannerHome";
import CampaignsHome from "../../components/CampaignsHome/CampaignsHome";
import { fetchBanners } from "../../services/banner/apiBannerServices";
export default function FimiPage() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetchBanners();
        console.log("Banners:", response);
        setBanners(response);
      } catch (error) {
        console.error("Error fetching banners:", error);
        // Handle error if needed
      }
    };

    fetchPosts();
  }, []);

  console.log('Banners in component:', banners); 

  return (
    <>
        <HeroBannerHome content={banners} />
        <CampaignsHome id="campaigns" />
    </>
  );
}
