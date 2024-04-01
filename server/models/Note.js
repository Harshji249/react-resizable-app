const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const note = mongoose.model("Note", noteSchema)
note.createIndexes
module.exports = note