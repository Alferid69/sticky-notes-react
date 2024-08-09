import { createContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { Main } from "./MainPage";


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

