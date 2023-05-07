import React from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { showAddNote } from "../../utils/Note";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Sidebar({isMinimized ,setMinimized}) {
  const {token ,userInfo ,logOut } =useContext(UserContext);
  const {setNotes } =useContext(NoteContext);

  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button className="btn btn-main text-capitalize w-100 mb-3" onClick={ ()=>showAddNote({token, userInfo, updater :setNotes})}>
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized ?null:"New Note"}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMinimized ?null:"Home"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="bi bi-search me-2"></i>
              {isMinimized ?null:"Search"} 
            </NavLink>
          </li>
          <li>
            <span className="pointer" onClick={logOut}>
              <i className="bi bi-box-arrow-left me-2"></i>
              {isMinimized ?null:"Log Out"}
            </span>
          </li>
        </ul>
        <div className={`${style.change} shadow pointer`} onClick={()=>setMinimized(!isMinimized)}>
          <i className={isMinimized ?`fa-solid fa-chevron-left `: `fa-solid fa-chevron-right `}></i>
        </div>
      </nav>
    </>
  );
}
