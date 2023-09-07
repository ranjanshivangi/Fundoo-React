import React from "react";
import "./TakeNoteTwo.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import Button from "@mui/material/Button";
import { createNote } from "../../services/NoteService";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ColorPopper from '../colorpopper/colorpopper';
import IconButton from '@mui/material/IconButton';

const TakeNoteTwo = (props) => {
  const [color, setColor] = React.useState('');
  const [archive, setArchive] = React.useState(false);
  const [noteObj, setNoteObj] = React.useState({
    title: "",
    description: "",
    color: "#FFFFFF",
    isArchive: false
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  function handleTitle(event) {    
    setNoteObj({ ...noteObj, title: event.target.value });
  }
  function handleDescription(event) {
    setNoteObj({ ...noteObj, description: event.target.value });
  }
  function handleColor(value) {
    setColor(value)
    setNoteObj({ ...noteObj, color: value });
  }
  function handleArchive() {  
    setArchive(!archive);    
    setNoteObj({ ...noteObj, isArchive: !archive });  

  }

  const handleClose = () => {
    
    createNote(noteObj)
      .then((res) => {
        console.log(res);
        props.AllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
    props.handleView(false);
  };

  return (
    <Paper elevation={4} className="note-two-paper" sx={{backgroundColor: `${color}`}}>
      <div className="title-box">
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
          onChange={handleTitle}
        />
        <PushPinOutlinedIcon fontSize="medium" />
      </div>
      <div className="description-box">
        <TextField
          id="standard-multiline-flexible"
          label="Take a note..."
          multiline
          maxRows={4}
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onChange={handleDescription}
        />
      </div>
      <div className="icons-box">
        <div className="icons-box-one">
          <IconButton>
          <AddAlertOutlinedIcon fontSize="small" /></IconButton>
          <IconButton><PersonAddAlt1OutlinedIcon fontSize="small" /></IconButton>
          <IconButton  onClick={handleClick} ><ColorLensOutlinedIcon fontSize="small"/></IconButton>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              <ColorPopper handleColor={handleColor}/>
            </Box>
          </Popper>
          <IconButton><ImageOutlinedIcon fontSize="small" /></IconButton>
          <IconButton onClick={handleArchive}><ArchiveOutlinedIcon fontSize="small" /></IconButton>
          <IconButton><MoreVertOutlinedIcon fontSize="small" /></IconButton>
          <IconButton><UndoOutlinedIcon fontSize="small" /></IconButton>
          <IconButton><RedoOutlinedIcon fontSize="small" style={{ color: "gray" }} /></IconButton>
        </div>
        <div className="icons-box-two">
          <Button variant="text" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default TakeNoteTwo;
