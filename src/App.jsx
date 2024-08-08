import { createContext, useContext, useEffect, useState } from "react";

// const notesSample = [
//   {
//     text: "today was a good daya;dfj a;fj",
//     color: "#3f35fe",
//     id: 1,
//     rotate: "10deg",
//   },
//   {
//     text: "today was a good daya;dfj a;fj",
//     color: "#ff31fe",
//     id: 2,
//     rotate: "-10deg",
//   },
//   {
//     text: "today was a good daa;dfj a;fjy",
//     color: "#3f65fe",
//     id: 3,
//     rotate: "-10deg",
//   },
//   {
//     text: "today was a good da;dfj a;fjay",
//     color: "#3f88fe",
//     id: 4,
//     rotate: "10deg",
//   },
// ];

const NoteContext = createContext();

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

function Header() {
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

function Main() {
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

function Form() {
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

function Notes({ text, color, rotate, id }) {
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

function Footer() {
  return <footer><p>&copy; 2024 Alferid Hassen. All rights reserved.</p></footer>;
}

function getRandomHexColor() {
  const hexCode = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexCode.padStart(6, "0")}`;
}

function getRandomRotation() {
  const rotation = Math.floor(Math.random() * 21) - 10;
  return `${rotation}deg`;
}
