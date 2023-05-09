import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export let NoteContext = createContext({});
export default function NoteContextProvider({ children }) {
  const [notes, setNotes] = useState();

  return (
    <>
      <NoteContext.Provider value={{ notes, setNotes }}>
        {children}
      </NoteContext.Provider>
    </>
  );
}
