import { useContext } from "react";
import { NoteContext } from "./App";

export function Header() {
  const { showNoteCreater, setShowNoteCreater } = useContext(NoteContext);
  return (
    <header>
      <button onClick={() => setShowNoteCreater(!showNoteCreater)}>
        {!showNoteCreater ? "Create Note" : "Hide"}
      </button>
      <h4>Sticky Notes</h4>
    </header>
  );
}
