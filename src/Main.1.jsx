import { useContext } from "react";
import { NoteContext } from "./App";
import { Notes } from "./Notes";
import { Form } from "./Form";

export function Main() {
  const { notes, showNoteCreater } = useContext(NoteContext);
  if (showNoteCreater) return <Form />;

  if (notes.length < 1)
    return (
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
        }}
      >
        Your Sticky Notes is Empty. <br />
        Please Add A Note.
      </main>
    );

  return (
    <main>
      {notes.map((note) => (
        <Notes
          text={note.text}
          color={note.color}
          rotate={note.rotate}
          id={note.id}
          key={note.id}
        />
      ))}
    </main>
  );
}
