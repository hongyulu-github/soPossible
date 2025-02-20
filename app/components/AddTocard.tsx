"use client";
import React from "react";

const AddTocard = () => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log("click");
        }}
      >
        Add to card
      </button>
    </div>
  );
};

export default AddTocard;
