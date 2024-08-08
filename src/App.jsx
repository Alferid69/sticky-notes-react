import { createContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { Main } from "./Main.1";


export const NoteContext = createContext();

export default function App() {
  const [showNoteCreater, setShowNoteCreater] = useState(false);
  const [notes, setNotes] = useState(function () {
    const values = localStorage.getItem("notes");
    return JSON.parse(values);
  });
  const [note, setNote] = useState("");

  useEffect(
    function () {
      localStorage.setItem("notes", JSON.stringify(notes));
    },
    [notes]
  );

  return (
    <NoteContext.Provider
      value={{
        notes,
        showNoteCreater,
        setShowNoteCreater,
        setNotes,
        note,
        setNote,
      }}
    >
      <Header />
      <Main />
      <Footer />
    </NoteContext.Provider>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Alferid Hassen. All rights reserved.</p>
    </footer>
  );
}

export function getRandomHexColor() {
  const hexCode = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexCode.padStart(6, "0")}`;
}

export function getRandomRotation() {
  const rotation = Math.floor(Math.random() * 21) - 10;
  return `${rotation}deg`;
}
