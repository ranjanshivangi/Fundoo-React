import React from "react";
import "./TakeNoteOne.css";
import Paper from "@mui/material/Paper";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";

const TakeNoteOne = (props) => {
  return (
    <Paper
      elevation={4}
      className="note-one-paper"
      onClick={() => props.handleView(true)}
    >
      <div className="note-one-text">Take a note...</div>
      <CheckBoxOutlinedIcon style={{ color: "gray" }} />
      <BrushOutlinedIcon style={{ color: "gray" }} />
      <PhotoOutlinedIcon style={{ color: "gray" }} />
    </Paper>
  );
};
export default TakeNoteOne;
