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
function Note({ noteInfo }) {
  const [bgColor, setBgColor] = useState(
    localStorage.getItem(`bgColor-${noteInfo._id}`) || "#FFD124"
  );

  // console.log(JSON.parse(localStorage.getItem("bgColor")));
  const { userInfo } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);
  const { token } = useContext(UserContext);
  const handleColor = (color, id) => {
    setBgColor(color.hex);
    localStorage.setItem(`bgColor-${noteInfo._id}`, color.hex);
  };
  return (
    <>
      <div
        className={`${style.note} note shadow notenote `}
        style={{ backgroundColor: bgColor }}
      >
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat  text-center handle">
            {noteInfo.title}
          </h2>
          <p className={`mb-0 mt-2`}>{noteInfo.desc};</p>
        </div>
        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer me-2"
            onClick={() => {
              showUpdateForm({
                token,
                userInfo,
                NoteID: noteInfo._id,
                PrevData: {
                  title: noteInfo.title,
                  desc: noteInfo.desc,
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
                NoteID: noteInfo._id,
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
            onChangeComplete={handleColor}
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
