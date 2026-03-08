import notesStore from "../stores/notesStore"


export default function CreateForm() {
    const store = notesStore()
  return (
    <div>
        {!store.updateForm._id && <div>
        <h2>
          create note
        </h2>

        <form onSubmit={store.createNote}>
          <input onChange={store.updateCreateFormField} value={store.createForm.title} name="title" />
          <textarea onChange={store.updateCreateFormField} value={store.createForm.body} name="body" />
          <button type="submit">Create a note</button>

        </form>
      </div>}
      
    </div>
  )
}
