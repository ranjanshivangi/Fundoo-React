import React from "react";
import "./ColorPopper.css";
import { Box } from "@mui/material";

const ColorPopper = (props) => {
  const colors = [
    "white",
    "red",
    "blue",
    "gray",
    "yellow",
    "green",
    "pink",
    "violet",
    "black",
    "brown",
    "purple"
  ];

  return (
    <Box className="color-popper-container">
      {colors.map((col, index) => (
        <div
          key={index}
          style={{ backgroundColor: `${col}` }}
          className="color-div"
          onClick={() => props.handleColor(`${col}`)}
        ></div>
      ))}
    </Box>
  );
};
export default ColorPopper;