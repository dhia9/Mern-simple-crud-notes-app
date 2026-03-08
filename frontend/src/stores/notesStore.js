import axios from 'axios'
import { create } from 'zustand'

const notesStore = create((set) => ({
  notes:[],
  fetchNotes:async()=>{
    const res =await axios.get("http://localhost:3700/notes")

    set({notes:res.data.notes})
  }
}))

export default notesStore ;


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