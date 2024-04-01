const Note = require('../models/Note')
const { validationResult } = require('express-validator');

const addnote = async(req, res)=>{
    try {
        const { title, desc } = req.body;
        console.log('ahahhah',title,desc)
        const note = new Note({
            title:title,
            desc:desc,
        });
        console.log('Note:',note)
        const savedNote = await note.save();
        console.log('SavedNote:',savedNote)
        res.status(200).json(savedNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error occurred');
    }
}

const updatenote = async(req, res)=>{
    const {title ,desc} = req.body;
    console.log('Received update request:', { id: req.params.id, title, desc });
    const newNote ={};
    if (title){newNote.title = title};
    if (desc){newNote.desc = desc};

    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")};

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
    res.status(200).json({note});
}

const getnote = async(req,res)=>{
    try {
        const note = await Note.find();
        res.send({ status: 200, note })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
}

module.exports ={
    addnote,
    updatenote,
    getnote
}