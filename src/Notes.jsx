import { useState, useContext } from "react";
import { NoteContext } from "./App";

export function Notes({ text, color, rotate, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setNotes, notes } = useContext(NoteContext);

  function handleDeleteNote(id) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    }
  }

  const noteStyle = {
    backgroundColor: color,
    color: "white",
    transform: isHovered ? "rotate(0deg) scale(1.1)" : `rotate(${rotate})`,
    zIndex: isHovered ? "2" : "1",
    transition: "transform 0.2s ease-in-out",
  };
  return (
    <div
      className="note"
      style={noteStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{text}</h3>
      <button onClick={() => handleDeleteNote(id)}>✖️</button>
    </div>
  );
}
