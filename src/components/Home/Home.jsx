import React from "react";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import style from "./Home.module.css";
import Loading from "../Loading/Loading"
import { getNotes } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import Note from "../Note/Note";

export default function Home() {
  let {notes ,setNotes} = useContext(NoteContext);
  console.log(notes);
  let {userInfo , token} =useContext(UserContext);
  console.log(token);
  console.log(userInfo);
  useEffect(()=> {
    getNotes({token , userInfo ,updater : setNotes});
  },[]);
  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes</h2>
      {notes ?(notes.length ? <div className={`${style.notes}`}>{notes.map((noteInfo )=><Note key={noteInfo._id} noteInfo={noteInfo}/>)}</div> : <h2>not found</h2>):<Loading/>}
    </>
  );
}
