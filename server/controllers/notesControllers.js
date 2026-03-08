const Note = require("../models/note")
const fetchNotes = async (req, res) => {
    const notes = await Note.find()
    res.json({ notes })
}
const fetchNote = async (req, res) => {
    const noteId = req.params.id
    const note = await Note.findById(noteId)
    res.json({ note })
}
const createNote = async (req, res) => {
    const { title, body } = req.body

    const note = await Note.create({
        body,
        title
    })
    res.json({note})
}

const updateNote = async (req, res) => {
    const noteId = req.params.id

    const { body, title } = req.body

    await Note.findByIdAndUpdate(noteId, {
        title,
        body
    })
    const note = await Note.findById(noteId)

    res.json({ note })
}
const deleteNote = async (req, res) => {
    const noteId = req.params.id

    await Note.deleteOne({ _id: noteId })

    res.json({ success: "deleted" })
}
module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}