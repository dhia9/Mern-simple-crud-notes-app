import axios from "axios"
import { useState, useEffect } from "react";
import notesStore from "../stores/notesStore";


function App() {
  const store = notesStore()
  // state
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: ""
  })
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: ""
  })

  // useEffect
  useEffect(() => {
    store.fetchNotes()
  }, [])


  // functions
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3700/notes")
    setNotes(res.data.notes)
    console.log(res)
  }
  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setCreateForm({
      ...createForm,
      [name]: value
    })


  }

  const createNote = async (e) => {
    e.preventDefault()

    const res = await axios.post("http://localhost:3700/notes", createForm)
    setNotes([...notes, res.data.note])
    setCreateForm({
      body: "",
      title: ""
    })

  }
  const deleteNote = async (_id) => {
    const res = await axios.delete(`http://localhost:3700/notes/${_id}`)

    const newNotes = [...notes].filter(note => {
      return note._id !== _id
    })
    setNotes(newNotes)

  }
  const handleUpdateFielChange = (e) => {
    const { value, name } = e.target

    setUpdateForm({
      ...updateForm,
      [name]: value
    })
  }

  const toggleUpdate = (note) => {
    setUpdateForm({ title: note.title, body: note.body, _id: note._id })

  }
  const  updateNote= async(e)=>{
    e.preventDefault()
    const {title,body}= updateForm

    const res = await axios.put(`http://localhost:3700/notes/${updateForm._id}`,{title,body})

    const newNotes= [...notes]
    const noteIndex = notes.findIndex((note)=>{
      return note._id===updateForm._id
    })
    newNotes[noteIndex]=res.data.note

    setNotes(newNotes)
    setUpdateForm({
      _id:null,
      title:"",
      body:""
    })
  }
  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {store.notes && store.notes.map(note => {
          return (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <h3>{note.body}</h3>
              <button onClick={() => deleteNote(note._id)}>delete note</button>
              <button onClick={() => toggleUpdate(note)}>update note</button>

            </div>)
        })}
      </div>

      {updateForm._id && <div>
        <h2>Update note</h2>
        <form onSubmit={updateNote}>
          <input onChange={handleUpdateFielChange} value={updateForm.title} name="title" />
          <textarea onChange={handleUpdateFielChange} value={updateForm.body} name="body" />
          <button type="submit">update note</button>
        </form>
      </div>}


      {!updateForm._id && <div>
        <h2>
          create note
        </h2>

        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} value={createForm.title} name="title" />
          <textarea onChange={updateCreateFormField} value={createForm.body} name="body" />
          <button type="submit">Create a note</button>

        </form>
      </div>}



    </div>
  );
}

export default App;
