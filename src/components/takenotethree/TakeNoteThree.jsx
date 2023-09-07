import React from "react";
import "./TakeNoteThree.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ColorPopper from "../colorpopper/colorpopper";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { archiveNote, updateNote, trashNote, deleteNote } from "../../services/NoteService";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

const TakeNoteThree = (props) => {

  let color = props.noteData.color;
 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [menuanchorEl, setMenuAnchorEl] = React.useState(null);
  const openMenu = Boolean(menuanchorEl);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {   
    setMenuAnchorEl(null);
  };
  const handleTrash = () => {
    trashNote(props.noteData.id)
      .then((res) => {
        console.log(res);
        props.AllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
    
    setMenuAnchorEl(null);
  };

  const handleColor = (value) => {
    color = value;
    updateNote(props.noteData.id, { color: value })
      .then((res) => {
        console.log(res);
        props.AllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  const handleArchive = () => {
    archiveNote(props.noteData.id)
      .then((res) => {
        console.log(res);
        props.AllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
    
  };
  const handleDelete =()=>{
    deleteNote(props.noteData.id)
      .then((res) => {        
        console.log(res);
        props.AllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  const handleRestore =()=>{
    trashNote(props.noteData.id)
      .then((res) => {
        console.log(res);
        props.AllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  return (
    <Paper
      elevation={4}
      className="note-three-paper"
      sx={{ backgroundColor: color }}
    >
      <div className="note-three-title-box">
        <span className="note-three-title">{props.noteData.title}</span>
        <IconButton>
          <PushPinOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="note-three-description-box">
        <p className="note-three-descp">{props.noteData.description}</p>
      </div>
      {props.drawerState === "Bin" ? (
        <div className="note-three-bin-icons-box">
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleRestore}>
          <RestoreFromTrashIcon fontSize="small" />
        </IconButton>
        </div>
      ) : (
        <div className="note-three-icons-box">
          <IconButton>
            <AddAlertOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <PersonAddAlt1OutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleClick}>
            <ColorLensOutlinedIcon fontSize="small" />
          </IconButton>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              <ColorPopper handleColor={handleColor} />
            </Box>
          </Popper>
          <IconButton>
            <ImageOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleArchive}>
            <ArchiveOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={openMenu ? "long-menu" : undefined}
            aria-expanded={openMenu ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={menuanchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleTrash}>Trash Note</MenuItem>
          </Menu>
        </div>
      )}
    </Paper>
  );
};
export default TakeNoteThree;
