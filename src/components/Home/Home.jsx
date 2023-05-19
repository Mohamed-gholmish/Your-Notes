import React from "react";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import style from "./Home.module.css";
import Loading from "../Loading/Loading"
import { getNotes } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import Note from "../Note/Note";
import Draggable from 'react-draggable';

import ReactDOM from 'react-dom';
import { useState } from "react";

export default function Home() {
  const {notes ,setNotes} = useContext(NoteContext);
  const {userInfo , token} =useContext(UserContext);
  const [positions ,setPositions] = useState({})
  console.log(notes);
  console.log(token);
  console.log(userInfo);
  useEffect(()=> {
    getNotes({token , userInfo ,updater : setNotes});
  },[]);
  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("notePositions"));
    console.log(savedPositions);
    if (savedPositions) {
      setPositions(savedPositions);
      console.log("saved is ok");
    }
  }, []);

  useEffect(() => {
    // Set the positions of the notes after the saved positions are loaded
    const notesContainer = document.querySelector(`.${style.notes}`);
    if (notesContainer) {
      notesContainer.childNodes.forEach((noteNode) => {
        const noteId = noteNode.getAttribute("data-note-id");
        if (noteId && positions[noteId]) {
          noteNode.style.transform = `translate(${positions[noteId].x}px, ${positions[noteId].y}px)`;
        }
      });
    }
  }, [positions]);
  const handleNoteStart = (event, ui) => {
    console.log("Drag started");
  };
  
  const handleNoteDrag = (event, ui) => {
    const { x, y } = ui;
    const noteId = event.target
    console.log(noteId,"onte id is");
    setPositions((prevPositions) => ({
      ...prevPositions,
      [noteId]: { x, y },
    }));
    console.log(positions);
  };
  const handleNoteStop = (event, ui) => {
    console.log("Drag stopped");
  };

  useEffect(() => {
    localStorage.setItem("notePositions", JSON.stringify(positions));
    console.log(positions);
    console.log(JSON.parse(localStorage.getItem("notePositions")))
  }, [positions]);
  return (
    <>
      <h2 className="font-Montserrat h4 heading ">
        <i className="bi bi-folder me-2"></i>My Notes</h2>
        <div className="row"><div className="col-md-5 ">      {notes ?(notes.length ? <div className={`${style.notes}`}>{notes.map((noteInfo )=>  <Draggable
                    key={noteInfo._id}
                    axis="both"
                    handle=".note-handle"
                    
                   
                    position = {positions[noteInfo._id]}
                    
                    grid={[25, 25]}
                    scale={1}
                    onStart={handleNoteStart}
                    onDrag={handleNoteDrag}
                    onStop={handleNoteStop}
                  >
                    
                    <div className="note-handle position-relative" data-note-id={noteInfo._id}>
                     
                      <Note noteInfo={noteInfo} />
                    </div>
                  </Draggable>)}</div> : <h2>not found</h2>):<Loading/>}
</div> 
<div className="col-md-2"><div className="vertical-line"></div></div>
<div className="col-md-5"><h1>hero</h1></div></div>

    </>
  );
}
