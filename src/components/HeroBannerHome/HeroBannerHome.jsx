import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const HeroBannerHome = ({ content = {} }) => {
    console.log("content for banners", JSON.stringify(content))
    //It seems that the data structure is an array ({"data":[{"id":1,"attributes":{...}}]}), 
    //so you need to access the first element in the array before trying to access the attributes and heroBanner. 
    //Update your HeroBannerHome component to handle the array structure:
    // Access the first element in the array
    const firstData = content?.data?.[0];

    // Extract heroBanner from the attributes
    const heroBanners = firstData?.attributes?.heroBanner || [];

    console.log("hero banners:", heroBanners)

    // Slider settings
    const sliderSettings = {
        // dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "h-100",
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };

    return (

        <section className="d-flex flex-column overflow-hidden h-100 slider-container">
            {heroBanners.length > 1 ? (
                <Slider {...sliderSettings} className="h-100">
                    {heroBanners.map((item, index) => (
                        <div key={index} className="h-100 text-center text-bg-dark bg-black bg-gradient">
                            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto align-items-center">
                                <div className="px-3">
                                    {/* Render each item in the slider */}
                                    <h1 className="mb-3 fw-semibold text-white">{item.bannerTitle}</h1>
                                    <p className="lead mb-5">{item.bannerDescription}</p>
                                    <p className="lead">
                                        <Link to={item.bannerUrl} className="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                /* Render for a single item */
                <div className="h-100">
                    <div className="d-flex h-100 text-center text-bg-dark bg-black bg-gradient">
                        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto justify-content-center align-items-center">
                            <div className="px-3">
                                <h1 className="mb-3 fw-bold text-white">{heroBanners[0]?.bannerTitle}</h1>
                                <p className="lead mb-5">{heroBanners[0]?.bannerDescription}</p>
                                <p className="lead">
                                    <Link to={heroBanners[0]?.bannerUrl} className="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroBannerHome;
