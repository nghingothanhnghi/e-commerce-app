// FeaturedList.jsx
import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import EmptyData from "../EmptyData/EmptyData";
const FeaturedList = ({ content }) => {
    console.log("featureds: ", content);

    return (
        <div className="pb-2">
            {content && content.length > 0 ? (
                <ListGroup as="ul" variant="flush">
                    {content.map((featured, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <img className="rounded-circle border p-1 bg-light flex-shrink-0" src={featured.FeaturedImageByUrl || "https://github.com/twbs.png"} width={32} height={32}/>
                            <div className="ms-2 me-auto">
                                {featured.featuredName}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <EmptyData message="No content available"/>
            )}
        </div>
    );
};

export default FeaturedList;
