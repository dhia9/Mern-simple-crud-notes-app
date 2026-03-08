import notesStore from "../stores/notesStore"

export default function Note({ note }) {

    const deleteNote = notesStore((state) => state.deleteNote);
    const toggleUpdate = notesStore((state) => state.toggleUpdate);

    return (
        <div key={note._id}>
            <h3>{note.title}</h3>
            <h3>{note.body}</h3>
            <button onClick={() => deleteNote(note._id)}>delete note</button>
            <button onClick={() => toggleUpdate(note)}>update note</button>
        </div>
    );
}