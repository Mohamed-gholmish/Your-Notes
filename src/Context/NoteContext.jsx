import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export let NoteContext = createContext({});
export default function NoteContextProvider({ children }) {
  const [notes, setNotes] = useState();
  // const [bgColor, setBgColor] = useState(0)


  return (
    <>
      <NoteContext.Provider value={{ notes, setNotes }}>
        {children}
      </NoteContext.Provider>
    </>
  );
}
