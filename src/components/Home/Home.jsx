import React from "react";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import style from "./Home.module.css";
import Loading from "../Loading/Loading";
import { getNotes } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import Note from "../Note/Note";
import Draggable from "react-draggable";
import { useState } from "react";
export default function Home() {
  const { notes, setNotes } = useContext(NoteContext);
  const { userInfo, token } = useContext(UserContext);
  let [id, setid] = useState();
  const [position, setPositions] = useState({});
  console.log(notes);
  console.log(token);
  console.log(userInfo);
  useEffect(() => {
    getNotes({ token, userInfo, updater: setNotes });
  }, []);
  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("notePositions"));
    console.log(savedPositions);
    if (savedPositions) {
      setPositions(savedPositions);
      // console.log("saved is ok");
    }
  }, []);
  useEffect(() => {
    // Set the positions of the notes after the saved positions are loaded
    const notesContainer = document.querySelector(`.${style.notes}`);
    if (notesContainer) {
      notesContainer.childNodes.forEach((noteNode) => {
        const noteId = noteNode.getAttribute("data-note-id");
        if (noteId && position[noteId]) {
          noteNode.style.transform = `translate(${position[noteId].x}px, ${position[noteId].y}px)`;
         noteNode.firstChild
        }
      });
    }
  }, [position]);
  // const handleNoteStart = (event, ui) => {
  //   console.log("Drag started");
  // };
  const handleNoteDrag = (event, ui) => {
    const { x, y } = ui;
    // console.log(ui,"uiuiuiuiui");
    const noteId = id;
    console.log(noteId, "onte id is");
    setPositions((prevPositions) => ({
      ...prevPositions,
      [noteId]: { x, y }
    }));
    console.log(position, "position positionj");
    // console.log(event, "event event ");
  };
  // const handleNoteStop = (event, ui) => {
  //   console.log("Drag stopped");
   
  // };
  useEffect(() => {
    // console.log(position,"ppppppppppppp");
    localStorage.setItem("notePositions", JSON.stringify(position));
    
    console.log(JSON.parse(localStorage.getItem("notePositions")));
  }, [position]);
  function handleClick(e) {
    setid(e);
  }
  return (
    <>
      <h2 className="font-Montserrat h4 heading ">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>
      <div className="notes">
        {" "}
        {notes ? (
          notes.length ? (
            <div className={`${style.notes}`}>
              {notes.map((noteInfo) => (
                <Draggable
                  key={noteInfo._id}
                  axis="both"
                  handle=".note-handle"
                  position={position[noteInfo._id]}
                  grid={[25, 25]}
                  scale={1}
                  // onStart={handleNoteStart}
                  onDrag={handleNoteDrag}
                  // onStop={handleNoteStop}
                  border="parent"
                >
                  <div
                    className="note-handle "
                    data-note-id={noteInfo._id}
                    onClick={() => handleClick(noteInfo._id)}
                    style={{backgroundColor:"#000000"}}
                  >
                    <Note noteInfo={noteInfo}  />
                  </div>
                </Draggable>
              ))}
            </div>
          ) : (
            <h2>not found</h2>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
