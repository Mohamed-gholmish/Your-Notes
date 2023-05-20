import React, { useState } from "react";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { UserContext } from "../../Context/UserContext";
import { CirclePicker } from "react-color";
import {
  deleteNotes,
  showDeleteAllert,
  showUpdateForm,
} from "../../utils/Note";

import style from "./Note.module.css";
function Note({ memoizedNoteInfo }) {
  const [bgColor, setBgColor] = useState("#ff0000");
  const { userInfo } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);
  const { token } = useContext(UserContext);
  return (
    <>
      <div
        className={`${style.note} note shadow notenote `}
        style={{ backgroundColor: bgColor, color: "#fff" }}
      >
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat  text-center handle">
            {memoizedNoteInfo.title}
          </h2>
          <p className={`mb-0 mt-2`}>{memoizedNoteInfo.desc};</p>
        </div>
        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer me-2"
            onClick={() => {
              showUpdateForm({
                token,
                userInfo,
                NoteID: memoizedNoteInfo._id,
                PrevData: {
                  title: memoizedNoteInfo.title,
                  desc: memoizedNoteInfo.desc,
                },
                updater: setNotes,
              });
            }}
          ></i>
          <i
            className="bi-archive-fill pointer "
            onClick={() => {
              showDeleteAllert({
                token,
                NoteID: memoizedNoteInfo._id,
                updater: setNotes,
                userInfo,
              });
            }}
          ></i>
        </div>
        <div className="color-picker ">
          {" "}
          <CirclePicker
            color={bgColor}
            onChangeComplete={(color) => {
              setBgColor(color.hex);
            }}
            colors={["#FFD124", "#BFACE2", "#645CBB"]}
            circleSize={25}
            circleSpacing={2}
            width={85}
            className="mx-auto"
          />
        </div>
      </div>
    </>
  );
}
export default React.memo(Note);
