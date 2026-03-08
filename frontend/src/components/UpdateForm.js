import notesStore from "../stores/notesStore"


export default function UpdateForm() {
    const store = notesStore()
    if (!store.updateForm._id) return<></>
    return (<div>
                <h2>Update note</h2>
                <form onSubmit={store.updateNote}>
                    <input onChange={store.handleUpdateFielChange} value={store.updateForm.title} name="title" />
                    <textarea onChange={store.handleUpdateFielChange} value={store.updateForm.body} name="body" />
                    <button type="submit">update note</button>
                </form>
            </div>
        
    )
}
