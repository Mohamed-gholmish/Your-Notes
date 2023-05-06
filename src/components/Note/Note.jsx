import React from "react";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { UserContext } from "../../Context/UserContext";
import { deleteNotes, showDeleteAllert } from "../../utils/Note";
import style from "./Note.module.css";

export default function Note({noteInfo}) {
  const {userInfo} = useContext(UserContext);
  const {setNotes} = useContext(NoteContext);
  const {token} = useContext(UserContext);

  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteInfo.title}</h2>
          <p className={`mb-0 mt-2`}>
        {noteInfo.desc};
          </p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2"></i>

          <i className="bi bi-archive-fill pointer" onClick={()=>{showDeleteAllert({token ,NoteID : noteInfo._id,updater : setNotes,userInfo})}} ></i>
        </div>
      </div>
    </>
  );
}
