import { useContext } from "react";
import { NoteContext } from "./App";

export function Form() {
  const {
    showNoteCreater,
    setShowNoteCreater,
    notes,
    setNotes,
    note,
    setNote,
  } = useContext(NoteContext);

  function handleAddNote() {
    if (!note) return;
    const newNote = {
      text: note,
      color: getRandomHexColor(),
      id: crypto.randomUUID(),
      rotate: getRandomRotation(),
    };
    setNotes([...notes, newNote]);
    setShowNoteCreater(false);
    setNote("");
  }

  if (!showNoteCreater) return null;
  return (
    <main>
      <div className="form">
        <div>
          <button onClick={() => setShowNoteCreater(!showNoteCreater)}>
            ✖️
          </button>
          <button onClick={handleAddNote}>✔️</button>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="type something..."
        />
      </div>
    </main>
  );
}


function getRandomHexColor() {
  const hexCode = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexCode.padStart(6, "0")}`;
}

function getRandomRotation() {
  const rotation = Math.floor(Math.random() * 21) - 10;
  return `${rotation}deg`;
}