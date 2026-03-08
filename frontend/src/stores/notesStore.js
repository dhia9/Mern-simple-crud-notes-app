import axios from 'axios'
import { create } from 'zustand'

const notesStore = create((set) => ({
  notes: [],
  createForm: {
    title: "",
    body: ""
  },
  updateForm: {
    _id: null,
    title: "",
    body: ""
  },
  fetchNotes: async () => {
    const res = await axios.get("http://localhost:3700/notes")

    set({ notes: res.data.notes })
  },
  updateCreateFormField: (e) => {
    const { name, value } = e.target

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value
        }
      }
    })
  },
  createNote: async (e) => {
    e.preventDefault()
    const { createForm, notes } = notesStore.getState()

    const res = await axios.post("http://localhost:3700/notes", createForm)

    set({
      notes: [...notes, res.data.note],
      createForm: {
        body: "",
        title: ""
      }
    })


  },
  deleteNote: async (_id) => {
    const res = await axios.delete(`http://localhost:3700/notes/${_id}`)

    const notes = notesStore.getState().notes
    const newNotes = notes.filter(note => {
      return note._id !== _id
    })
    set({
      notes: newNotes
    })

  },
  handleUpdateFielChange: (e) => {
    const { value, name } = e.target
    set(state => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value
        }
      }
    })
  },
  toggleUpdate: ({ _id, title, body }) => {
    set({
      updateForm: {
        title,
        body,
        _id
      }
    })

  },
  updateNote: async (e) => {
    e.preventDefault()
    const { notes,
      updateForm: { _id,
        title,
        body } } = notesStore.getState()


    const res = await axios.put(`http://localhost:3700/notes/${_id}`, { title, body })

    const newNotes = [...notes]
    const noteIndex = notes.findIndex((note) => {
      return note._id ===_id
    })
    newNotes[noteIndex] = res.data.note
    set({
      notes:newNotes,
      updateForm:{
      _id: null,
      title: "",
      body: ""
    }
    })
    
  }

}))

export default notesStore;
// const [notes, setNotes] = useState([]);
//   const [createForm, setCreateForm] = useState({
//     title: "",
//     body: ""
//   })
//   const [updateForm, setUpdateForm] = useState({
//     _id: null,
//     title: "",
//     body: ""
//   })

//   // useEffect
//   useEffect(() => {
//     store.fetchNotes()
//   }, [])


// function Counter() {
//   const { count, inc } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }



// const useStore = create((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
// }))

// function Counter() {
//   const { count, inc } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }