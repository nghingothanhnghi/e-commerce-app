import React, { useState } from "react";
import emptyImage from "../../assets/empty-paper.png";
const EmptyData = ({ message }) => {
  return (
    <>
      <div className="py-5 my-5 text-center text-muted leading">
        <img src={emptyImage} className="mb-3" width={46} />
        <p>{message}</p>
      </div>
    </>
  );
};

export default EmptyData;
