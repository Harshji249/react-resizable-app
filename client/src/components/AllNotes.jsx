import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllNotes = () => {
    const baseURL = 'https://react-resizable-app.onrender.com/api/note/';
    const [allNotes, setAllNotes] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    const fetchMyNotes = async () => {
        try {
            const response = await axios.get(`${baseURL}getnote`);
            return response.data.note;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notes = await fetchMyNotes();
                setAllNotes(notes);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [allNotes]);

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleSave = async (noteId, updatedNote) => {
        try {
            await axios.put(`${baseURL}updatenote/${noteId}`, updatedNote);
            const updatedNotes = await fetchMyNotes();
            setAllNotes(updatedNotes);
            setEditIndex(-1);
        } catch (error) {
            console.log('Error updating note:', error);
        }
    };

    return (
        <>
            {allNotes.map((note, index) => (
                <div key={note._id}>
                    {editIndex === index ? (
                        <>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <input style={{marginBottom:10, width:300, height:30, fontSize:'22px'}}
                                type="text"
                                value={note.title}
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    setAllNotes((prevNotes) =>
                                    prevNotes.map((prevNote, i) =>
                                    i === index ? { ...prevNote, title: newTitle } : prevNote
                                    )
                                    );
                                }}
                                />
                            <input
                            style={{marginBottom:10, width:300, height:30, fontSize:'22px'}}
                                type="text"
                                value={note.desc}
                                onChange={(e) => {
                                    const newDesc = e.target.value;
                                    setAllNotes((prevNotes) =>
                                    prevNotes.map((prevNote, i) =>
                                    i === index ? { ...prevNote, desc: newDesc } : prevNote
                                    )
                                    );
                                }}
                                />
                            <button
                            style={{marginBottom:10, width:310, height:30, fontSize:'22px'}}    
                                onClick={() => {
                                    handleSave(note._id, { title: note.title, desc: note.desc });
                                }}
                                >
                                Save
                            </button>
                            </div>
                        </>
                    ) : (
                        <>
                        <div>
                            <div style={{display:"flex"}}>
                            <h2 style={{marginRight:10}}>{index+1}.</h2>
                            <h2>Title : {note.title}</h2>
                            </div>
                            <div style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
                            <h3>Description : {note.desc}</h3>
                            <button style={{marginLeft:'20px',width:90, height:30, fontSize:'22px'}}onClick={() => handleEdit(index)}>Edit</button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default AllNotes;
