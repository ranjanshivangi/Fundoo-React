import React from "react";
import "./Dashboard.css";
import TakeNoteOne from "../../components/takenoteone/TakeNoteOne";
import TakeNoteTwo from "../../components/takenotetwo/TakeNoteTwo";
import { Diversity1 } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Notes from "./notes.json";
import TakeNoteThree from "../../components/takenotethree/TakeNoteThree";
import { getAllNotes } from "../../services/NoteService";
import MiniDrawer from "../../components/header/Header";

const Dashboard = () => {
  const [drawerState, setDrawerState] = React.useState();
  const [view, setView] = React.useState(false);
  const [noteView, setNoteView] = React.useState(true);
  const [allNotes, setAllNotes] = React.useState([]);

  const handleDrawerState = (value) => {
    
    setDrawerState(value);
  };

 
  const handleView = (value) => {
    setView(value);
  };
  const AllNotes = () => {
    getAllNotes()
      .then((res) => {        
        //setAllNotes(res.data.data);
        switch (drawerState) {
          case "Bin":
            let binNotes = res.data.data.filter(
              (notes) => notes.isTrash === true
            );
            
            setAllNotes(binNotes);
            break;
          case "Archive":
            let archiveNotes = res.data.data.filter(
              (notes) => notes.isTrash === false && notes.isArchive === true
            );
            
            setAllNotes(archiveNotes);
            break;
          default:
            let filteredNotes = res.data.data.filter(
              (notes) => notes.isTrash === false && notes.isArchive === false
            );
            
            setAllNotes(filteredNotes);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    AllNotes();
  }, [drawerState]);

  return (
    <div className="dasboard-container">
      <MiniDrawer handleDrawerState={handleDrawerState}/>
      {view ? (
        <TakeNoteTwo handleView={handleView} AllNotes={AllNotes} />
      ) : (
        <TakeNoteOne handleView={handleView} />
      )}
      <div className="notes-grid">
        <Grid container height="100%" width="100%" rowGap={1}>
          {allNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
              <TakeNoteThree
                noteData={note}
                AllNotes={AllNotes}
                drawerState={drawerState}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default Dashboard;
